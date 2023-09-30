CREATE TABLE InstagramPosts (
    id INTEGER PRIMARY KEY,
    text TEXT,
    thumbnail_src TEXT,
    display_url TEXT,
    short_code TEXT,
    base64 TEXT,
    uploaded_at TIMESTAMP,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    update_count INTEGER
);