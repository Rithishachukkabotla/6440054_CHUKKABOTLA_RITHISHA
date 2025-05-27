-- Organizers with their event counts by status
SELECT 
    u.full_name AS organizer,
    SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) AS upcoming_events,
    SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) AS completed_events,
    SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_events
FROM 
    Users u
JOIN 
    Events e ON u.user_id = e.organizer_id
GROUP BY 
    u.user_id, u.full_name;