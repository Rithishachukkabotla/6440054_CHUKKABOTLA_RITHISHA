-- Events with registrations but no feedback
SELECT 
    e.title,
    COUNT(r.registration_id) AS registration_count
FROM 
    Events e
JOIN 
    Registrations r ON e.event_id = r.event_id
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
WHERE 
    f.feedback_id IS NULL
GROUP BY 
    e.event_id, e.title;