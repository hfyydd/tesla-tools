'use client'

import { useState, useEffect } from 'react';

// 定义一个接口来描述 NetworkInformation 类型
interface NetworkInformation extends EventTarget {
  effectiveType: string;
  // 可以添加其他属性，如果需要的话
}

export default function ClientInfo() {
  const [info, setInfo] = useState({
    screenWidth: 0,
    screenHeight: 0,
    orientation: '',
    connection: '',
    cookieEnabled: false,
    userAgent: '',
    language: '',
    platform: '',
    doNotTrack: '',
    colorDepth: 0,
    pixelRatio: 1,
    maxTouchPoints: 0,
    hardwareConcurrency: 0,
    deviceMemory: 0,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateInfo = () => {
      setInfo({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        orientation: window.screen.orientation ? window.screen.orientation.type : '未知',
        connection: 'connection' in navigator 
          ? (navigator.connection as NetworkInformation).effectiveType || '未知'
          : '未知',
        cookieEnabled: navigator.cookieEnabled,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        doNotTrack: navigator.doNotTrack || '未知',
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: 'deviceMemory' in navigator ? (navigator as any).deviceMemory : 0,
      });
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);

    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      window.removeEventListener('resize', updateInfo);
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`全屏请求失败: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const InfoItem = ({ label, value }: { label: string; value: string | number | boolean }) => (
    <div className="bg-white rounded-md p-4">
      <span className="font-semibold text-blue-600">{label}:</span>
      <span className="text-gray-700 ml-2">{value.toString()}</span>
    </div>
  );

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">浏览器和设备信息</h2>
        <button
          onClick={toggleFullscreen}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isFullscreen ? '退出全屏' : '全屏显示'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem label="屏幕分辨率" value={`${info.screenWidth} x ${info.screenHeight}`} />
        <InfoItem label="屏幕方向" value={info.orientation} />
        <InfoItem label="连接方式" value={info.connection} />
        <InfoItem label="Cookie 启用" value={info.cookieEnabled ? '是' : '否'} />
        <InfoItem label="用户代理" value={info.userAgent} />
        <InfoItem label="语言" value={info.language} />
        <InfoItem label="平台" value={info.platform} />
        <InfoItem label="Do Not Track" value={info.doNotTrack} />
        <InfoItem label="颜色深度" value={`${info.colorDepth} 位`} />
        <InfoItem label="设备像素比" value={info.pixelRatio} />
        <InfoItem label="最大触摸点数" value={info.maxTouchPoints} />
        <InfoItem label="CPU 核心数" value={info.hardwareConcurrency} />
        <InfoItem label="设备内存" value={`${info.deviceMemory} GB`} />
      </div>
    </div>
  );
}