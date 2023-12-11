import { Flex, Link } from "@radix-ui/themes";
import React from "react";

export const NavigationBar: React.FC = () => {
  return (
    <Flex justify="between">
      <Link
        href="https://book.saizeriya.co.jp/menu2310_j/book/#target/page_no=1"
        target="_blank"
        rel="noreferrer"
        size="3"
        weight="bold"
      >
        チートシート
      </Link>
      <Link
        href="https://x.com/putchom"
        target="_blank"
        rel="noopener noreferrer"
        size="3"
        weight="bold"
      >
        @putchom
      </Link>
    </Flex>
  );
};
