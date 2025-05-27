-- Users registered multiple times for same event
SELECT 
    u.full_name,
    e.title,
    COUNT(r.registration_id) AS registration_count
FROM 
    Registrations r
JOIN 
    Users u ON r.user_id = u.user_id
JOIN 
    Events e ON r.event_id = e.event_id
GROUP BY 
    r.user_id, r.event_id, u.full_name, e.title
HAVING 
    COUNT(r.registration_id) > 1;