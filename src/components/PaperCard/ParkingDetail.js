import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AssistantDirectionOutlinedIcon from '@mui/icons-material/AssistantDirectionOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { Avatar, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as GarageAPI from '../../api/garageAPI';
import * as Service from '../../services/index';
import TablePrice from '../Table/TablePrice';

ParkingDetail.propTypes = {
};

function ParkingDetail() {

  const loc = useLocation();
  const id = Service.checkIfStringNull(loc.state.id);
  const userLocation = Service.checkIfLocationNull(loc.state.location);
  const [value, setValue] = useState({});
  
  useEffect(() => {
    async function getDetailData() {
      if (window.ZaloPay.isZaloPay) {
        window.ZaloPay.showLoading()
      }
      try {
        const tempData = await Service.checkIfDetailParkingNull(GarageAPI.getDetailGarage(id, userLocation));
        if (tempData.status == "OK") {
          setValue(tempData.data);
        } 
      } catch (err) {
        setValue(Service.checkIfDetailParkingNull(null)); 
      }
      if (window.ZaloPay.isZaloPay) {
        window.ZaloPay.hideLoading()
      }
     
    }
    getDetailData();
  }, [])

  const navigate = useNavigate();
  return (
    <Paper style={ {height: 'calc(100vh - 56px)', display: 'flex', justifyContent: 'center', backgroundColor: '#f6f7f8'}}>
        <Stack alignItems="center">
            <Card sx={{ width: '100%', height: '80vh', marginTop: '0px', borderRadius: '0px', overflow: 'auto',}} variant="outlined">
              <CardContent>
                <Typography gutterBottom fontSize={20} component="div" align="center" color={"#24272B"}>
                  Th??ng tin chi ti???t
                </Typography>
              </CardContent>
              <Box alignItems="center" justifyContent="center" display="flex">
                <Avatar sx={{ width: 80, height: 80 }}>
                      </Avatar>
              </Box>
              <CardContent style={{ lineHeight: "28px" }}>
                <Typography gutterBottom fontSize={24} component="div" align='center' >
                  <b>{value.parkingLotName}</b> 
                </Typography>
                <Stack direction="row" marginTop={1}>
                  <TwoWheelerIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div" > {value.timeMoving} ph??t - {value.distance} km</Typography>
                </Stack>
                <Stack direction="row" marginTop={1}>
                  <LocationOnOutlinedIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div" >{value.street}, {value.ward}, {value.district}, {value.city}</Typography>
                </Stack>
                
                <Stack direction="row" marginTop={1}>
                  <AccessTimeOutlinedIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div">
                      {value.status === 0 ? <text style={{color:'green', fontWeight: 'bold'}}> C??n ch???</text> : <text style={{color: 'red', fontWeight: 'bold'}}> H???t ch???</text> }
                  </Typography>
                  <Typography fontSize={14} component="div" marginLeft={1} >{value.timeOpen}:00 AM - {value.timeClose}:00 PM</Typography>
                </Stack>
                <Stack direction="row" marginTop={1}>
                  <LocalPhoneOutlinedIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div">0{value.phoneNumber}</Typography>
                </Stack>
                {/* <Typography variant="h7" component="div" paragraph>
                  <b> M?? t???: </b> {v.discription}
                </Typography>
                <Typography variant='h7' component="div" paragraph>
                  <b> ??i???u kho???n s??? d???ng: </b>
                </Typography>
                <Typography variant="h7" component="div" paragraph> 
                  <b> H?????ng d???n s??? d???ng: </b>
                </Typography> */}

                <TablePrice />


              </CardContent>
          
            </Card>
            <Button 
                variant="outlined" 
                startIcon={<AssistantDirectionOutlinedIcon />} 
                sx={{marginTop: 2, width: '90vw'}} 
                onClick={() => {navigate('/googlemap', {state: {origin: userLocation, destination: {
                  lat: value.lat,
                  lng: value.ing,
                }}});}}
            >

                Hi???n th??? b???n ?????
            </Button>
            
        </Stack>
    </Paper>
  )
}

export default ParkingDetail