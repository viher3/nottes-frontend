import React from 'react';
import Navbar from 'Components/Common/Navbar';
import Sidebar from 'Components/Common/Sidebar';

class Container extends React.Component
{
    render(){
        return(
            <div id="page-wrapper" className="gray-bg">
                <div className="wrapper wrapper-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <Navbar/>
                                <section className="main-section row">
                                    <div className="col-2 sidebar-wrapper">
                                        <Sidebar/>
                                    </div>
                                    <div className="col-10">
                                        {this.props.children}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;
