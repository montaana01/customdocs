import React from 'react';
import FormField from './FormField';

const Form = ({ fields, onChange }) => {
    const handleFieldChange = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index].value = value;
        onChange(updatedFields);
    };

    return (
        <form>
            {fields.map((field, index) => (
                <FormField
                    key={index}
                    field={field}
                    onChange={(value) => handleFieldChange(index, value)}
                />
            ))}
        </form>
    );
};

export default Form;