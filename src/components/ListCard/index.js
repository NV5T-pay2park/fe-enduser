import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';

ListCard.propTypes = {
    list: PropTypes.array,
};

function ListCard({ list }) {

    var myStyle = {
        maxHeight: 'calc(100vh - 162px)',
        overflow: 'auto',
    }
    return (
        <Paper>
            <List style={myStyle} sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
                {list.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value.id}`;
                    return (
                        <ListItem key={value.id}
                            disablePadding
                        >


                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        src={`/src/img/Garage/img.png`}
                                    >
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={value.name} secondary={value.address}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    );
}

export default ListCard;