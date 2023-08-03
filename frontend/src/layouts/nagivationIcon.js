import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const navigate = useNavigate()
  const handleRedirect = (path) => {
    navigate(`/dashboard/${path}`)
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleRedirect('summary')}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Executive Summary" />
      </ListItemButton>
      <ListItemButton onClick={() => handleRedirect('lead')}>
        <ListItemIcon>
          <AssignmentIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Project Lead" />
      </ListItemButton>
      <ListItemButton onClick={() => handleRedirect('developer')}>
        <ListItemIcon>
          <PeopleIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Developer" />
      </ListItemButton>
      <ListItemButton onClick={() => handleRedirect('admin')}>
        <ListItemIcon>
          <AdminPanelSettingsIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItemButton>
    </React.Fragment>
  )
};
