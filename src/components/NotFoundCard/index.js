import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import axios from 'axios'
import * as Constant from '../../config/config'

const mockNewTicket = {"id":101,"checkInTime":"2022-07-18T07:27:48Z","checkOutTime":null,"licensePlates":"77C1-44094","vehicleType":{"id":1,"vehicleTypeName":"Xe máy","hibernateLazyInitializer":{}},"endUser":{"id":2,"firstName":"Partypooper009","lastName":"throwaway217217","gender":0,"phone":"0790529870","email":"throwaway217217@gmail.com"},"parkingLot":{"id":6,"parkingLotName":"Hiệp Phú","numberSlot":101,"numberSlotRemaining":101,"address":"Bình Chiểu, Thành phố Thủ Đức, TPHCM","status":0,"merchant":{"id":1,"name":"Thành phố Thủ Đức","represent":"Lee4an","email":"Lee4an@gmail.com","phone":"0906094163","hibernateLazyInitializer":{}},"lat":10.884166717529297,"ing":106.73027801513672,"timeOpen":5,"timeClose":22,"phoneNumber":"982347126","hibernateLazyInitializer":{}}}

const NotFoundCard = () => {

  const navigate = useNavigate();
  const context = useContext(AppContext);

  const scanWithZaloPayQR = () => {
    if (window.ZaloPay.isZaloPay) {
      const info = window.ZLP.Device().scanQRCode({ "needResult": 1, "scanType": 'qrCode'}).then(value => {        
        let parkingId = value.page
        window.ZaloPay.showDialog({
          title: "QR response",
          message: "QR response: " + "---id: " + parkingId + "---raw: " + JSON.stringify(value),
          button: "OK"
        });
        if (parkingId !== undefined) {
          const json2 = '{"id": 100, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" }}, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets"}}'
          const obj = JSON.parse(json2);
          window.ZaloPay.showLoading()
          axios.post(Constant.SERVER_BASE_URL + '/api/checkIn', {
            endUserID: 2,
            parkingLotID: 4
          })
          .then(function (response) {
            window.ZaloPay.hideLoading()

            context.insertTicket(mockNewTicket)
            navigate('/')
          })
          .catch(function (error) {
            window.ZaloPay.hideLoading()
            window.ZaloPay.showDialog({
              title: "QR response",
              message: "QR response: " + JSON.stringify(error),
              button: "OK"
            });
            navigate('/')
          });
        }
        return value 
      })
    } else {
      navigate('/qr')
    }
  }

  return (
    <Card sx={{ maxWidth: '80vw', height: '70vh', marginTop: '0px', borderRadius: '20px', minWidth: '80vw' }} variant="outlined">
    <Box alignItems="center" justifyContent="center" display="flex">
      <CardMedia
        component="img"
        sx={{height: 140, width: 140, marginTop: 5}}
        // image="./toro_cry_rmbg.png"
        image="./toro_cry.webp"

        alt="toro_cry"
      />
    </Box>
    <CardContent>
      <Typography gutterBottom sx={{fontSize: 16}} component="div" align='center' color='blue'>
          Bạn không có thẻ xe cần thanh toán
      </Typography>
      <Typography sx={{fontSize: 13}} color="text.secondary" component="div">
        Quét mã checkin để gửi xe
      </Typography>
      <Button onClick={scanWithZaloPayQR} align='center' variant="contained" fullWidth="true" sx={{backgroundColor: '#008fe5', maxWidth: 290, marginTop: 10}}>Quét mã QR</Button>
    </CardContent>
  </Card>
  )
}

export default NotFoundCard