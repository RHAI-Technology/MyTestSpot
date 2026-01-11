CREATE TABLE tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    series_id UUID REFERENCES test_series(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL,
    sections JSONB NOT NULL, -- Subject distribution
    marking_scheme JSONB NOT NULL, -- +4, -1, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);