import React, { forwardRef } from "react"
import { Field, Input, InputGroup } from "@chakra-ui/react"

const InputUI = forwardRef(({ required = false, label, helperText, helperTextErrorManipulation, errorText, group, ...props }, ref) => {
  return (
    <Field.Root required={required}>
      {label && (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      )}

      {group ? (
        <InputGroup {...group}>
          <Input ref={ref} {...props} />
        </InputGroup>
      ) : (
        <Input ref={ref} {...props} />
      )}

      {helperText && <Field.HelperText color={helperTextErrorManipulation ? "red": "gray.700"}>{helperText}</Field.HelperText>}
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  )
})

export default InputUI
