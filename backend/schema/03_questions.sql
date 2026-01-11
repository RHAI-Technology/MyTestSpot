CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    subject VARCHAR(50) NOT NULL,
    question_type VARCHAR(20) DEFAULT 'MCQ', -- MCQ, MSQ, NAT
    content TEXT NOT NULL, -- Supports LaTeX
    options JSONB, -- The choices
    correct_answer TEXT NOT NULL,
    explanation TEXT
);