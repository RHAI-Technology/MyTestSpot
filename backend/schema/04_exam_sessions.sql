CREATE TABLE exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- From Supabase Auth
    test_id UUID REFERENCES tests(id),
    status VARCHAR(20) DEFAULT 'ongoing',
    malpractice_count INT DEFAULT 0,
    responses JSONB DEFAULT '[]'::jsonb,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_score DECIMAL(6, 2) DEFAULT 0.00
);