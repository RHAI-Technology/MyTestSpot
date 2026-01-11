CREATE TABLE test_series (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    exam_type VARCHAR(50) NOT NULL, -- 'JEE_MAIN', 'JEE_ADVANCED', 'NEET'
    price DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);