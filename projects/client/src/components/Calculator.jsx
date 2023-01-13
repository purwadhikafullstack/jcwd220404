import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";

export const Calculator = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <div>
      <HStack maxW="200px">
        <Button variant={"unstyled"} {...dec}>
          -
        </Button>
        <Input w={"50px"} {...input} />
        <Button variant={"unstyled"} {...inc}>
          +
        </Button>
      </HStack>
    </div>
  );
};
