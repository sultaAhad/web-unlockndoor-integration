/**
 * VideoCallModal
 *
 * A full-screen dark overlay modal that hosts <AgoraVideoCall />.
 * Handles entrance / exit animations itself — parent just toggles `isOpen`.
 *
 * Props:
 *   isOpen         {boolean}
 *   onClose        {Function}  — called after the exit animation completes
 *   callProps      {object}    — all props forwarded to <AgoraVideoCall />
 */

import React, { useEffect, useRef, useState } from "react";
import AgoraVideoCall from "./AgoraVideoCall";

const VideoCallModal = ({ isOpen, onClose, callProps }) => {
    const [visible, setVisible] = useState(false); // controls DOM presence
    const [animated, setAnimated] = useState(false); // controls CSS active class
    const closingRef = useRef(false);

    // ── Open ────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen) {
            closingRef.current = false;
            setVisible(true);
            // rAF ensures the element is in the DOM before adding the active class
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimated(true));
            });
        }
    }, [isOpen]);

    // ── Close (triggered by AgoraVideoCall calling onCallEnd) ───────────────
    const handleClose = () => {
        if (closingRef.current) return;
        closingRef.current = true;
        setAnimated(false); // triggers CSS exit animation
        setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, 320); // matches --anim-duration
    };

    if (!visible) return null;

    return (
        <div
            className={`vcm-backdrop ${animated ? "vcm-backdrop--active" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Video call"
        >
            {/* Subtle noise texture overlay */}
            <div className="vcm-noise" aria-hidden="true" />

            <div className={`vcm-shell ${animated ? "vcm-shell--active" : ""}`}>

                {/* ── Header bar ──────────────────────────────────────────────── */}
                <div className="vcm-header">
                    <div className="vcm-header__dot vcm-header__dot--red" />
                    <div className="vcm-header__dot vcm-header__dot--amber" />
                    <div className="vcm-header__dot vcm-header__dot--green" />
                    <span className="vcm-header__label">
                        {callProps?.callType === "isCalling" ? "Outgoing call" : "Incoming call"}
                    </span>
                    <div className="vcm-header__spacer" />
                    <div className="vcm-remote-name">
                        {callProps?.remoteUser?.name ?? ""}
                    </div>
                </div>

                {/* ── Call content ────────────────────────────────────────────── */}
                <div className="vcm-body">
                    <AgoraVideoCall
                        {...callProps}
                        onCallEnd={handleClose}
                    />
                </div>

            </div>
        </div>
    );
};

export default VideoCallModal;