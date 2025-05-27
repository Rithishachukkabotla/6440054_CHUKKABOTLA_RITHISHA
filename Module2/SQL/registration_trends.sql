-- Monthly registration counts (past 12 months)
SELECT 
    DATE_FORMAT(registration_date, '%Y-%m') AS month,
    COUNT(registration_id) AS registrations
FROM 
    Registrations
WHERE 
    registration_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY 
    DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY 
    month;