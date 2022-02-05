import React from 'react';
import Drawer from 'rc-drawer';
import CreateApplication from './CreateApplication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="gray" size="lg" />

export default function CurrentApplications() {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <div className="employMe-div-box" >
                <div className="employMe-div-box-action">
                    <p className="employMe-div-box-title">Current Applications</p>
                    <button
                      className="employMe-add-btn"
                      onClick={() => setIsOpen(true)}
                    >
                      Create
                    </button>
                </div>
            </div>
            <Drawer
                open={isOpen}
                width="50vw"
                handler={false}
                level={null}
                autoFocus={false}
                showMask={true}
                maskClosable={true}
                onClose={() => setIsOpen(false)}
                placement="right"
                contentWrapperStyle={{
                    background: 'white'
                }}
                maskStyle={{
                    opacity: "0.5"
                }}
                width="64vw"
            >
                <CreateApplication close={<button 
                    onClick={() => setIsOpen(false)}
                >
                    {closeIcon}
                </button>}/>
            </Drawer>
        </>
    )
}