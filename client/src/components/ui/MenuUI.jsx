import { Menu, Portal } from "@chakra-ui/react";

const MenuUI = ({ children, content, ...props }) => {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        {content}
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderRadius="md"
            boxShadow="md"
            py={2}
          >
            {children}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const MenuItemUI = ({ children, text, ...props }) => {
  return (
    <Menu.Item
      px={4}
      py={2}
      cursor="pointer"
      _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
      _focus={{ bg: "gray.100", _dark: { bg: "gray.700" } }}
      {...props}
    >
      {children ?? text}
    </Menu.Item>
  );
};

export { MenuUI, MenuItemUI };
