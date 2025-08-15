import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group'
import VisibilityIcon from '@mui/icons-material/Visibility';

function mapStateToProps(state) {
    return {};
}

class TemporaryBuyView extends Component {
    state = {
        componentExplainContent: false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ componentExplainContent: true }), 300)
        console.log("TemporaryTextContent TemporaryTextContent TemporaryTextContent")
    }

    render() {
        return (
            <CSSTransition
                in={this.state.componentExplainContent}
                timeout={400}
                classNames={{
                    enter: 'opac-enter',
                    enterActive: 'opac-enter-active',
                    exit: 'opac-exit',
                    exitActive: 'opac-exit-active'
                }}
                unmountOnExit
            >
                <Fragment>
                    <span 
                        className='d-flex flex-column center initShopTXT'
                        style={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            borderRadius: '8px',
                            padding: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: `
                                0px 2px 4px rgba(0, 0, 0, 0.3),
                                0px 4px 8px rgba(0, 0, 0, 0.2),
                                0px 0px 8px rgba(184, 134, 11, 0.3),
                                0px 6px 12px rgba(139, 111, 71, 0.2)
                            `,
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: 'scale(1)',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: `
                                    0px 4px 8px rgba(0, 0, 0, 0.35),
                                    0px 6px 12px rgba(0, 0, 0, 0.25),
                                    0px 0px 12px rgba(184, 134, 11, 0.4),
                                    0px 8px 16px rgba(139, 111, 71, 0.3)
                                `
                            }
                        }}
                    >
                        <VisibilityIcon 
                            className='InitShopIcon' 
                            style={{ 
                                color: '#b8860b', // Deep gold for elegance
                                fontSize: '1.5rem',
                                marginBottom: '8px'
                            }} 
                        />
                        <span style={{
                            fontFamily: '"Georgia", Times, serif',
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#fff',
                            marginBottom: '8px'
                        }}>
                            مشاهده
                        </span>
                        <div style={{ height: '8px' }}></div>
                        {this.props.introduction && (
                            <p style={{
                                fontFamily: '"Roboto", Arial, sans-serif',
                                fontSize: '0.75rem',
                                color: '#d3d3d3', // Light gray for contrast
                                lineHeight: '1.4',
                                textAlign: 'center',
                                margin: '0',
                                maxWidth: '200px',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {this.props.introduction}
                            </p>
                        )}
                    </span>
                </Fragment>
            </CSSTransition>
        );
    }
}

export default connect(mapStateToProps)(TemporaryBuyView);