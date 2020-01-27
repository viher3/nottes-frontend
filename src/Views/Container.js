import React from 'react';
import Navbar from 'Components/Common/Navbar';

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
                                <section className="main-section">
                                    {this.props.children}
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
