import React from "react"

import { Container } from "reactstrap";

import styles from '../../pages/announcement/Blog.module.scss';

export default function Timeline() {
    return (
        <>
            <div className="company__timeline" style={{ marginBottom: "100px" }}>
                <h3 className={"text-center fw-bold mb-5 mt-5"}>Company Timelines</h3>
                <Container className={`${styles.company__timeline_container} pt-5 mt-5`}>

                    <div className={`${styles.timeline_block} timeline_block ${styles.timeline_block_right}`}>
                        <div className={`${styles.marker}`}></div>
                        <div className={`${styles.timeline_content}`}>
                            <h3>First Year</h3>
                            <span>Some work experience</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>

                    <div className={`${styles.timeline_block} timeline_block ${styles.timeline_block_left}`}>
                        <div className={`${styles.marker}`}></div>
                            <div className={`${styles.timeline_content}`}>
                            <h3>Seconed Year</h3>
                            <span>Some work experience</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>

                    <div className={`${styles.timeline_block} timeline_block ${styles.timeline_block_right}`}>
                        <div className={`${styles.marker}`}></div>
                            <div className={`${styles.timeline_content}`}>
                            <h3>Third Year</h3>
                            <span>Some work experience</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>

                    <div className={`${styles.timeline_block} timeline_block ${styles.timeline_block_left}`}>
                        <div className={`${styles.marker}`}></div>
                            <div className={`${styles.timeline_content}`}>
                            <h3>Fourth Year</h3>
                            <span>Some work experience</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>

                    <div className={`${styles.timeline_block} timeline_block ${styles.timeline_block_right}`}>
                        <div className={`${styles.marker}`}></div>
                            <div className={`${styles.timeline_content}`}>
                            <h3>Fifth Year</h3>
                            <span>Some work experience</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
                        </div>
                    </div>

                    <div style={{ clear: 'both' }}></div>

                </Container>
            </div>
        </>
    )
}