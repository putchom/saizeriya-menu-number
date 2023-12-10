import React from "react";

export const NavigationBar: React.FC = () => {
  return (
    <div>
      <h1>サイゼのメニュー番号</h1>
      <nav>
        <ul>
          <li>
            <a
              href="https://book.saizeriya.co.jp/menu2310_j/book/#target/page_no=1"
              target="_blank"
              rel="noreferrer"
            >
              チートシート
            </a>
          </li>
          <li>
            <a
              href="https://x.com/putchom"
              target="_blank"
              rel="noopener noreferrer"
            >
              by @putchom
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
