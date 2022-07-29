import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import QrReader from 'react-camera-qr';
import * as CheckInOutAPI from '../../api/checkInOutAPI';

const mockNewTicket = {
  "ticketID": 26,
  "checkInTime": "2022-07-26T00:24:02Z",
  "amount": null,
  "licensePlate": "77C1-67567",
  "vehicleType": "Xe máy",
  "endUserID": 3,
  "endUserName": "Jenna1021 neccernpogrlinzi15",
  "parkingLotID": 4,
  "parkingLotName": "Brủh",
  "status": false
}
const QrPage = () => {

  const context = useContext(AppContext)
  const navigate = useNavigate();
  const [facingMode, setFacingMode] = useState("user")
  const [scanResult, setScanResult] = useState('');
  const [showLoading, setShowLoading] = useState(false);


  const handleErrorCam = (error) => {
    console.log(error);
  }

  const handleScanCam = async (result) => {
      if (result) {
          const json2 = '{"id": 13, "name": "Leanne Graham", "username": "Bret", "email": "Sincere@april.biz", "address": { "street": "Kulas Light", "suite": "Apt. 556", "city": "Gwenborough", "zipcode": "92998-3874", "geo": { "lat": "-37.3159", "lng": "81.1496" }}, "phone": "1-770-736-8031 x56442", "website": "hildegard.org", "company": { "name": "Romaguera-Crona", "catchPhrase": "Multi-layered client-server neural-net", "bs": "harness real-time e-markets"}}'
          const obj = JSON.parse(json2);
          let parkingId = obj.id


          if (parkingId !== undefined) {
            parkingId = parseInt(parkingId)
            if (isNaN(parkingId) || parkingId < 0) parkingId = 12

              try {
                  const res = await CheckInOutAPI.requestCheckIn(context.userInfo.id, parkingId)

                  if (res.message === "Success") {
                    const newTicket = res.data
                    if (newTicket.ticketID !== undefined) {
                      context.insertTicket(newTicket)
                    }
                  } else {
                    console.log(res.message)
                  }
                  navigate('/')
              } catch (err) {
                  navigate('/')
              }
          }
      }
  }

  const handleSwitchCam = () => {
    console.log("before switch cam: " + facingMode)
    setFacingMode(facingMode == 'environment' ? 'user' : 'environment')
  }

  const showManualQr = () => {
    return (
      <div>
          <QrReader
              delay={300}
              onError={handleErrorCam}
              onScan={handleScanCam}
              style={{ width: '100%' }}
              facingMode={facingMode}
              />
          <Box textAlign='center' alignItems='center'>
            <Button onClick={handleSwitchCam}>Switch Cam</Button>
          </Box>
          <Box textAlign='center' alignItems='center'>
            <Button onClick={() => navigate('/test-qr')}>Test qr-scanner lib</Button>
          </Box>
          <Box>{JSON.stringify(scanResult)}</Box>     
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', height: 'calc(100vh - 56px)', justifyContent: 'center', justifyItems: 'center', alignItems: 'center'}}>
      { showLoading && <LoadingIndicator />}
      {!window.ZaloPay.isZaloPay ? showManualQr() : () => {navigate('/')}}
    </div>
  )
}

export default QrPage