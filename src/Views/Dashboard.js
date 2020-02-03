import React from 'react';
import Container from 'Views/Container';
import DashboardComponent from 'Components/Dashboard/Dashboard';

class Dashboard extends React.Component
{
    render(){
        return(
            <Container>
                <DashboardComponent />
            </Container>
        );
    }
}

export default Dashboard;
