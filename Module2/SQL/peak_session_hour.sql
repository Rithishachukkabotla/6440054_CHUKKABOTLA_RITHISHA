-- Sessions scheduled between 10 AM to 12 PM per event
SELECT 
    e.title AS event,
    COUNT(s.session_id) AS peak_hour_sessions
FROM 
    Events e
LEFT JOIN 
    Sessions s ON e.event_id = s.event_id
    AND TIME(s.start_time) BETWEEN '10:00:00' AND '12:00:00'
GROUP BY 
    e.event_id, e.title;