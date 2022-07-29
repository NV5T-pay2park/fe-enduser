import * as LoginAPI from './loginAPI'
import * as Constant from '../config/config'

const mockLoginResponse = {
    "status": "OK",
    "message": "Success",
    "data": {
        "zalopayID": "93jfkd092f2fs4",
        "endUserID": 31
    }
}

describe('test login api', () => {
    test('test login succesfully', async () => {
      // highlight-start
      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() =>
        Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockLoginResponse),
                })
        )
      // highlight-end

      const loginResponse = await LoginAPI.requestLogin("93jfkd092f2fs4")
      expect(fetchMock).toHaveBeenCalledWith(
        Constant.SERVER_BASE_URL + "/api/loginenduser?zlpId=93jfkd092f2fs4"
      )
      expect(loginResponse).toBe(mockLoginResponse.data)
    })
})