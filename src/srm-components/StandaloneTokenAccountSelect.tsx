import React from 'react';
import { Button, Col, Select, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { TokenAccount } from '../srm-utils/types';
import { useSelectedTokenAccounts } from '../srm-utils/markets';
import { abbreviateAddress } from '../srm-utils/utils';
import { notify } from '../srm-utils/notifications';

export default function StandaloneTokenAccountsSelect({
  accounts,
  mint,
  label,
}: {
  accounts: TokenAccount[] | null | undefined;
  mint: string | undefined;
  label?: boolean;
}) {
  const [selectedTokenAccounts, setSelectedTokenAccounts] = useSelectedTokenAccounts();

  let selectedValue: string | undefined;
  if (mint && mint in selectedTokenAccounts) {
    selectedValue = selectedTokenAccounts[mint];
  } else if (accounts && accounts?.length > 0) {
    selectedValue = accounts[0].pubkey.toBase58();
  } else {
    selectedValue = undefined;
  }

  const setTokenAccountForCoin = value => {
    if (!mint) {
      notify({
        message: 'Error selecting token account',
        description: 'Mint is undefined',
        type: 'error',
      });

      return;
    }
    const newSelectedTokenAccounts = { ...selectedTokenAccounts };
    newSelectedTokenAccounts[mint] = value;
    setSelectedTokenAccounts(newSelectedTokenAccounts);
  };

  return (
    <React.Fragment>
      {label && <Col span={8}>Token account:</Col>}
      <Col span={label ? 13 : 21}>
        <Select style={{ width: '100%' }} value={selectedValue} onSelect={setTokenAccountForCoin}>
          {accounts?.map(account => (
            <Select.Option key={account.pubkey.toBase58()} value={account.pubkey.toBase58()}>
              <Typography.Text code>
                {label ? abbreviateAddress(account.pubkey, 8) : account.pubkey.toBase58()}
              </Typography.Text>
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={2} offset={1}>
        <Button
          shape="round"
          icon={<CopyOutlined />}
          size={'small'}
          onClick={() => selectedValue && navigator.clipboard.writeText(selectedValue)}
        />
      </Col>
    </React.Fragment>
  );
}
