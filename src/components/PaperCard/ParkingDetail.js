import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AssistantDirectionOutlinedIcon from '@mui/icons-material/AssistantDirectionOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { Avatar, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
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

  const ZaloPay = Service.ZaloPay(window.ZaloPay);

  const loc = useLocation();
  const id = Service.checkIfStringNull(loc.state.id);
  const userLocation = Service.checkIfLocationNull(loc.state.location);
  const [value, setValue] = useState({});

  const getTime = (s) => {
    if (s == null) {
      return ""
    }
    return s.toString().substr(0, 5)
  }
  
  useEffect(() => {
    async function getDetailData() {
      if (ZaloPay.isZaloPay) {
        ZaloPay.showLoading()
      }
      
      const tempData = await Service.checkIfDetailParkingNull(GarageAPI.getDetailGarage(id, userLocation));
      setValue(tempData.data);

      if (ZaloPay.isZaloPay) {
        ZaloPay.hideLoading()
      }
     
    }
    getDetailData();
  }, [])

  const imgUrl = Service.getCheckedNullList(value?.images).length ? value.images[0].url : './toro-claim.webp'
  console.log(imgUrl)
  const navigate = useNavigate();
  return (
    <Paper style={ {height: 'calc(100vh - 56px)', display: 'flex', justifyContent: 'center', backgroundColor: '#f6f7f8'}}>
        <Stack alignItems="center">
            <Card sx={{ width: '100%', height: '80vh', marginTop: '0px', borderRadius: '0px', overflow: 'auto',}} variant="outlined">
              <CardContent>
                <Typography gutterBottom fontSize={20} fontWeight="bold" component="div" align="center" color={"#24272B"}>
                  Thông tin chi tiết
                </Typography>
              </CardContent>
              <Box alignItems="center" justifyContent="center" display="flex">
                <Avatar sx={{ width: 120, height: 120 }} src={imgUrl}>
                      </Avatar>
              </Box>
              {/* <CardMedia
                component="img"
                height="140"
                objectFit="contain"
                image={imgUrl}
                alt="green iguana"
              /> */}
              <CardContent style={{ lineHeight: "28px" }}>
                <Typography gutterBottom fontSize={24} component="div" align='center' >
                  <b>{value.parkingLotName}</b> 
                </Typography>
                <Stack direction="row" marginTop={1}>
                  <TwoWheelerIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div" > {value.timeMoving} phút - {value.distance} km</Typography>
                </Stack>
                <Stack direction="row" marginTop={1}>
                  <LocationOnOutlinedIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div" >{value.street}, {value.ward}, {value.district}, {value.city}</Typography>
                </Stack>
                
                <Stack direction="row" marginTop={1}>
                  <AccessTimeOutlinedIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div">
                      {value.status === 0 ? <text style={{color:'green', fontWeight: 'bold'}}> Còn chỗ</text> : <text style={{color: 'red', fontWeight: 'bold'}}> Hết chỗ</text> }
                  </Typography>
                  <Typography fontSize={14} component="div" marginLeft={1} >{getTime(value.timeOpen)} AM - {getTime(value.timeClose)} PM</Typography>
                </Stack>
                <Stack direction="row" marginTop={1}>
                  <LocalPhoneOutlinedIcon sx={{color: '#4286F6', marginRight: "12px"}}/>
                  <Typography fontSize={14} component="div">{value.phoneNumber}</Typography>
                </Stack>
              

                <TablePrice />


              </CardContent>
          
            </Card>
            <Button 
                variant="outlined" 
                startIcon={<AssistantDirectionOutlinedIcon />} 
                sx={{marginTop: 2, width: '90vw'}} 
                onClick={() => {navigate('/googlemap', {state: {origin: userLocation, destination: {
                  lat: value.lat,
                  lng: value.lng,
                }}});}}
            >

                Hiển thị bản đồ
            </Button>
            
        </Stack>
    </Paper>
  )
}

export default ParkingDetail