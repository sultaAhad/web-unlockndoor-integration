/**
 * CallNotification
 *
 * Shows an incoming-call banner with Accept / Reject buttons.
 * This component only handles the PRE-CALL notification UI.
 * Accepting transitions to <AgoraVideoCall />.
 *
 * Props:
 *   callerUser      {object}   - { id, name, profile_image_url, gender }
 *   transactionId   {number}
 *   channelName     {string}   - Agora channel to join on accept
 *   onAccept        {Function} - parent mounts <AgoraVideoCall />
 *   onReject        {Function} - parent dismisses the notification
 *   currentUserId   {number|string}
 */

import React, { useEffect, useRef } from "react";
import { useCallActionMutation } from "../../network/services/Chat";
import { formatDateTime } from "../../Constant/HelperFunction";
import {
	cleanupPusherClient,
	createPusherClient,
	getRejectCallChannelName,
} from "../../utils/pusher";

const CallNotification = ({
    callerUser,
    transactionId = 0,
    channelName,
    onAccept,
    onReject,
    currentUserId,
}) => {
    const [callAction] = useCallActionMutation();
    const rejectedRef = useRef(false); // prevent double-fire

    // ─── If the caller cancels before we answer ─────────────────────────────
    useEffect(() => {
        const pusher = createPusherClient({ encrypted: false });
        const channel = pusher.subscribe(getRejectCallChannelName(currentUserId));

        channel.bind("call.action", (data) => {
            if (
                !rejectedRef.current &&
                (data?.data?.action === "reject-call" || data?.data?.action === "end-call")
            ) {
                rejectedRef.current = true;
                onReject?.("cancelled");
            }
        });

        return () => {
            cleanupPusherClient(pusher, [channel]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAccept = () => {
        if (rejectedRef.current) return;
        onAccept?.();
    };

    const handleReject = async () => {
        if (rejectedRef.current) return;
        rejectedRef.current = true;

        const { date: end_date, time: end_time } = formatDateTime();

        await callAction({
            channel_name: `reject_call_${callerUser?.id}`,
            action: "reject-call",
            start_date: end_date,
            start_time: end_time,
            end_date,
            end_time,
            charges_transaction_id: transactionId,
            remark: "Call rejected",
            data: {
                start_date: end_date,
                start_time: end_time,
                end_date,
                end_time,
                charges_transaction_id: transactionId,
                remark: "Call rejected",
            },
        }).catch(console.error);

        onReject?.("rejected");
    };

    return (
        <div className="incoming-call-notification">
            <div className="caller-info">
                {callerUser?.profile_image_url ? (
                    <img
                        src={callerUser.profile_image_url}
                        alt={callerUser?.name ?? "Caller"}
                        className="caller-avatar"
                    />
                ) : (
                    <div className="caller-avatar-placeholder">
                        {callerUser?.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                )}
                <div className="caller-details">
                    <p className="caller-name">{callerUser?.name ?? "Unknown"}</p>
                    <p className="call-label">Incoming video call…</p>
                </div>
            </div>

            <div className="call-actions">
                {/* Reject */}
                <button
                    type="button"
                    className="btn-call btn-reject"
                    onClick={handleReject}
                    aria-label="Reject call"
                >
                    <i className="fa-solid fa-phone-slash" />
                </button>

                {/* Accept */}
                <button
                    type="button"
                    className="btn-call btn-accept"
                    onClick={handleAccept}
                    aria-label="Accept call"
                >
                    <i className="fa-solid fa-phone" />
                </button>
            </div>
        </div>
    );
};

export default CallNotification;
