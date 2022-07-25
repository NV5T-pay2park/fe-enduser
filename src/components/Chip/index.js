import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';


FilterChip.propTypes = {
    handleChoose:  PropTypes.func,
};

function FilterChip({handleChoose})  {

    const [chooseBike, setChooseBike] = useState(true);
    const [chooseCar, setChooseCar] = useState(false);
    const [chooseContainer, setChooseContainer] = useState(false);

    const handleOnClickBike = () => {
        if (chooseBike) {
            setChooseBike(false);
            return;            
        }
        setChooseBike(true);
    }

     const handleOnClickCar = () => {
        if (chooseCar) {
            setChooseCar(false);
            return;            
        }
        setChooseCar(true);
    }

     const handleOnClickContainer = () => {
        if (chooseContainer) {
            setChooseContainer(false);
            return;            
        }
        setChooseContainer(true);
    }

    return (
        <Stack direction="row" spacing={0.5}>

            <Chip   label="Xe máy" 
                    icon={<TwoWheelerIcon />} 
                    variant={chooseBike ? "outlined" : "filled"} 
                    clickable onClick={() => handleOnClickBike()} 
                    color={chooseBike ? "primary" : "default"}     
                    size="small"   
            />

            <Chip 
                    label="Xe hơi" 
                    icon={<DirectionsCarIcon />} 
                    variant={chooseCar ? "outlined" : "filled"} 
                    clickable onClick={() => handleOnClickCar() } 
                    color={chooseCar ? "primary" : "default"}
                    size="small"
            />

            <Chip 
                    label="Xe container" 
                    icon={<LocalShippingIcon />} 
                    variant={chooseContainer ? "outlined" : "filled"} 
                    clickable onClick={() => handleOnClickContainer()} 
                    color={chooseContainer ? "primary" : "default"} 
                    size="small"
            />

        </Stack>

    )

}

export default FilterChip;