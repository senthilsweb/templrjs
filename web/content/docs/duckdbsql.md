# SQL

```sql
CREATE TABLE IF NOT EXISTS id_sequence (entity_name VARCHAR, next_id INTEGER);
```


```sql
CREATE TABLE IF NOT EXISTS blogs (
    id INT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP DEFAULT current_timestamp,
    update_count INT DEFAULT 0,
    title VARCHAR,
    content TEXT
);
```