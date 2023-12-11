'use client';
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Layout,
  Menu,
  Switch,
  theme,
} from 'antd';
import Image from 'next/image';
import sosBigLogo from '/public/images/icons/sos-logo.svg';
import sosSmallLogo from '/public/images/icons/sos-small.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faDashboard, faSignOut, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleResize = localStorage.getItem('adminTheme');
    if (handleResize) {
      if (handleResize === 'dark') {
        setUseDarkMode(true);
      } else {
        setUseDarkMode(false);
      }
    } else {
      setUseDarkMode(false);
      localStorage.setItem('adminTheme', 'light');
    }
  }, []);

  const HandleIcon = () => (
    useDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} color='#f7f752' />
  );

  const changeThemeMode = () => {
    if (useDarkMode) {
      setUseDarkMode(false);
      localStorage.setItem('adminTheme', 'light');
    } else {
      setUseDarkMode(true);
      localStorage.setItem('adminTheme', 'dark');
    }
  };
  const menuItems = [
    {
      key: '0',
      icon: (
        <span
          className={`anticon ant-menu-item-icon ${
            collapsed && '!mt-[8px] !mr-[-7px]'
          }`}
        >
          <FontAwesomeIcon icon={faDashboard} />
        </span>
      ),
      label: (
        <Link href={'/dashboard'} passHref>
          Home
        </Link>
      ),
      role: ['superadmin'],
      route: '/dashboard',
    },
    {
      key: '1',
      icon: (
        <span
          className={`anticon ant-menu-item-icon ${
            collapsed && '!mt-[8px] !mr-[-7px]'
          }`}
        >
          <FontAwesomeIcon icon={faUsers} />
        </span>
      ),
      label: (
        <Link href={'/dashboard/users'} passHref>
          Users
        </Link>
      ),
      role: ['superadmin'],
      route: '/dashboard/users',
    },
  ];
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setShowDrawer(false);
  }, [router, pathname]);

  return (
    <div dir={'ltr'} className={`${useDarkMode && 'dark'}`}>
      <ConfigProvider
        theme={{
          algorithm: useDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Layout
          style={{ backgroundColor: `${useDarkMode ? '#143158' : '#e7e7e7'}` }}
        >
          <Sider
            trigger={null}
            collapsible
            theme={`${useDarkMode ? 'dark' : 'light'}`}
            collapsed={collapsed}
            className={`h-full min-h-[100vh] flex-col justify-between hidden md:flex  ${
              !collapsed && '!min-w-[240px] !max-w-[240px]'
            }`}
          >
            {collapsed ? (
              <div
                className={
                  'w-full flex flex-col justify-center items-center pt-6 mb-10 !font-IRANSansXV'
                }
              >
                <Image
                  priority={true}
                  unoptimized={true}
                  src={sosSmallLogo}
                  alt={'کمک رسان ایران'}
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <div
                className={
                  'w-full flex flex-col justify-center items-center pt-6 mb-10 !font-IRANSansXV'
                }
              >
                <Image
                  priority={true}
                  unoptimized={true}
                  src={sosBigLogo}
                  alt={'کمک رسان ایران'}
                  width={100}
                  height={40}
                />
              </div>
            )}
            <Menu
              theme={`${useDarkMode ? 'dark' : 'light'}`}
              mode="inline"
              className={'!font-IRANSansXV'}
              defaultSelectedKeys={['0']}
              items={menuItems}
            />
            <div className={'flex justify-center items-center cursor-pointer'}>
              <div
                className={
                  'absolute bottom-4 flex justify-center items-center flex-col '
                }
              >
                <ConfigProvider
                  theme={{
                    token: {
                      controlHeight: 24,
                      fontSize: 24,
                      colorPrimary: '#143158',
                    },
                  }}
                >
                  <Switch
                    checked={useDarkMode}
                    onChange={changeThemeMode}
                    checkedChildren={<HandleIcon />}
                    unCheckedChildren={<HandleIcon />}
                    className={`theme-toggle-switch relative`}
                  />
                </ConfigProvider>
                <div>
                  <Button
                    className={
                      'flex justify-center items-center mt-4 rounded-2xl'
                    }
                    danger
                    // onClick={() => logout()}
                  >
                    <span
                      className={` text-xl font-IRANSansXV  text-[#d30008] ${
                        collapsed ? '!hidden' : 'block ml-3'
                      }`}
                    >
                      Exit
                    </span>
                    <span className={'!m-0 anticon ant-menu-item-icon'}>
                      <FontAwesomeIcon icon={faSignOut} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Sider>
          <Layout
            style={{ background: `${useDarkMode ? '#143158' : '#e7e7e7'}` }}
          >
            <Header
              style={{
                padding: 0,
                background: `${useDarkMode ? '#001529' : '#ffffff'}`,
                color: `${useDarkMode ? '#ffffff' : '#212121'}`,
              }}
              className={
                'flex justify-between items-center relative w-full bg-black'
              }
            >
              <Button
                type="text"
                className={'hidden sm:block'}
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined
                      style={{
                        color: `${useDarkMode ? '#ffffff' : '#212121'}`,
                      }}
                    />
                  ) : (
                    <MenuFoldOutlined
                      style={{
                        color: `${useDarkMode ? '#ffffff' : '#212121'}`,
                      }}
                    />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <div className={'sm:hidden block px-5'}>
                <Button
                  type="text"
                  className={'flex justify-center items-center'}
                  onClick={() => setShowDrawer(true)}
                >
                  <MenuOutlined />
                </Button>
                <Drawer
                  title={
                    <div
                      className={
                        'w-full flex flex-col justify-center items-center !font-IRANSansXV relative'
                      }
                    >
                      <Image
                        priority={true}
                        unoptimized={true}
                        src={sosBigLogo}
                        alt={'کمک رسان ایران'}
                        width={100}
                        height={40}
                      />
                    </div>
                  }
                  placement="right"
                  onClose={() => setShowDrawer(false)}
                  open={showDrawer}
                  className={'drawer-right-menu'}
                >
                  <Menu
                    theme={`${useDarkMode ? 'dark' : 'light'}`}
                    mode="inline"
                    className={'!font-IRANSansXV pt-4 px-2'}
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                  />
                  <div
                    className={
                      'flex justify-center items-center cursor-pointer '
                    }
                  >
                    <div
                      className={
                        'absolute bottom-4 flex justify-center items-center flex-col w-full'
                      }
                    >
                      <ConfigProvider
                        theme={{
                          token: {
                            controlHeight: 24,
                            fontSize: 24,
                            colorPrimary: '#143158',
                          },
                        }}
                      >
                        <Switch style={{backgroundColor: useDarkMode ? 'green' : 'orange'}}
                          checked={useDarkMode}
                          onChange={changeThemeMode}
                          checkedChildren={<HandleIcon />}
                          unCheckedChildren={<HandleIcon />}
                          className={
                            useDarkMode
                              ? 'absolute left-1.5 top-1.5 transition-opacity'
                              : 'absolute right-1.5 top-1.5 transition-opacity'
                          }
                        />
                      </ConfigProvider>
                      <div>
                        <Button
                          className={
                            'flex justify-center items-center mt-4 rounded-2xl'
                          }
                          danger
                          // onClick={() => logout()}
                        >
                          <span
                            className={` text-xl font-IRANSansXV  text-[#d30008] ${
                              collapsed ? '!hidden' : 'block ml-3'
                            }`}
                          >
                            Exit
                          </span>
                          <span className={'!m-0 anticon ant-menu-item-icon'}>
                            <FontAwesomeIcon icon={faSignOut} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Drawer>
              </div>
              <div
                className={
                  'flex items-center m-auto text-center mr-6 !font-IRANSansXV absolute right-0 w-fit'
                }
              >
                <div className={`!font-IRANSansXV ml-4 hidden md:block`}>
                  {/* {user?.name} {user?.family} */}
                  Super
                </div>
                <Avatar
                  className={` flex items-center !font-IRANSansXV`}
                  shape={'circle'}
                  style={{
                    backgroundColor: `${useDarkMode ? '#ffffff' : '#212121'}`,
                    color: `${useDarkMode ? '#212121' : '#ffffff'}`,
                  }}
                >
                  {/* {user?.family} */}
                  Admin
                </Avatar>
              </div>
            </Header>
            <Content
              style={{
                margin: '10px',
                padding: 10,
                background: `${useDarkMode ? '#001529' : '#f0f0f0'}`,
                color: `${useDarkMode ? '#ffffff' : '#212121'}`,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
