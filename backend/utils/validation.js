const validateQuestion = (data) => {
    const errors = [];
    if (!data.content) errors.push("Question content is required");
    if (!data.subject) errors.push("Subject is required");
    if (!data.correct_answer) errors.push("Correct answer is required");
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = validateQuestion;