import React from 'react';

const FormField = ({ field, onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    switch (field.type) {
        case 'text':
            return (
                <div>
                    <label>{field.label}</label>
                    <input type="text" value={field.value} onChange={handleChange} />
                </div>
            );
        case 'date':
            return (
                <div>
                    <label>{field.label}</label>
                    <input type="date" value={field.value} onChange={handleChange} />
                </div>
            );
        case 'select':
            return (
                <div>
                    <label>{field.label}</label>
                    <select value={field.value} onChange={handleChange}>
                        {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            );
        default:
            return null;
    }
};

export default FormField;