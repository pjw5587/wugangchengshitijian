<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>舞钢市城市体检信息采集平台</title>
    <!-- 百度地图API（替换为你的AK） -->
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=你的百度地图AK"></script>
    <!-- ECharts数据可视化 -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <!-- 字体图标 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/iconfont-iconpark@1.4.2/dist/css/iconpark.css">
    <style>
        /* ===================== 全局样式 ===================== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Microsoft Yahei", "PingFang SC", "Helvetica Neue", sans-serif;
            transition: all 0.3s ease;
        }

        :root {
            /* 亮色主题变量 */
            --primary-color: #2f5597;
            --primary-light: #4a72b5;
            --primary-dark: #1e3d70;
            --secondary-color: #ff7e36;
            --bg-color: #f8f9fa;
            --card-bg: #ffffff;
            --text-primary: #333333;
            --text-secondary: #666666;
            --text-light: #999999;
            --border-color: #e5e9f2;
            --success-color: #52c41a;
            --warning-color: #faad14;
            --danger-color: #f5222d;
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
            --radius-sm: 4px;
            --radius-md: 8px;
            --radius-lg: 12px;
            --radius-xl: 16px;
        }

        .dark-theme {
            /* 暗色主题变量 */
            --primary-color: #4e78c7;
            --primary-light: #6a8fda;
            --primary-dark: #3058a0;
            --secondary-color: #ff9559;
            --bg-color: #1a1a1a;
            --card-bg: #242424;
            --text-primary: #f5f5f5;
            --text-secondary: #d0d0d0;
            --text-light: #909090;
            --border-color: #333333;
            --shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* 滚动条美化 */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: var(--border-color);
            border-radius: var(--radius-sm);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--text-light);
            border-radius: var(--radius-sm);
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--text-secondary);
        }

        /* 通用按钮样式 */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 24px;
            border: none;
            border-radius: var(--radius-md);
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            outline: none;
            user-select: none;
            background-color: var(--primary-color);
            color: #ffffff;
            box-shadow: var(--shadow);
        }
        .btn:hover {
            background-color: var(--primary-light);
            box-shadow: var(--shadow-hover);
            transform: translateY(-2px);
        }
        .btn:active {
            transform: translateY(0);
        }
        .btn:disabled {
            background-color: var(--text-light);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        .btn-secondary {
            background-color: var(--secondary-color);
        }
        .btn-secondary:hover {
            background-color: #ff9559;
        }
        .btn-success {
            background-color: var(--success-color);
        }
        .btn-success:hover {
            background-color: #67d92f;
        }
        .btn-danger {
            background-color: var(--danger-color);
        }
        .btn-danger:hover {
            background-color: #ff4d4f;
        }
        .btn-outline {
            background-color: transparent;
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
        }
        .btn-outline:hover {
            background-color: var(--primary-color);
            color: #ffffff;
        }
        .btn-sm {
            padding: 8px 16px;
            font-size: 14px;
        }
        .btn-lg {
            padding: 16px 32px;
            font-size: 18px;
        }

        /* 通用卡片样式 */
        .card {
            background-color: var(--card-bg);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            padding: 24px;
            margin-bottom: 24px;
        }
        .card:hover {
            box-shadow: var(--shadow-hover);
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
        }
        .card-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--primary-color);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .card-body {
            padding: 8px 0;
        }
        .card-footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 16px;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--border-color);
        }

        /* 表单控件样式 */
        .form-group {
            margin-bottom: 20px;
        }
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-size: 16px;
            font-weight: 500;
            color: var(--text-primary);
        }
        .form-label-required::after {
            content: "*";
            color: var(--danger-color);
            margin-left: 4px;
        }
        .form-control {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 16px;
            color: var(--text-primary);
            background-color: var(--card-bg);
            outline: none;
        }
        .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px rgba(47, 85, 151, 0.1);
        }
        .form-control::placeholder {
            color: var(--text-light);
        }
        .form-text {
            margin-top: 4px;
            font-size: 14px;
            color: var(--text-light);
        }
        .form-error {
            color: var(--danger-color);
            font-size: 14px;
            margin-top: 4px;
            display: none;
        }
        .form-control.error {
            border-color: var(--danger-color);
        }
        .form-control.error + .form-error {
            display: block;
        }

        /* 单选/复选框样式 */
        .radio-group, .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 8px;
        }
        .radio-item, .checkbox-item {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            font-size: 16px;
        }
        .radio-item input, .checkbox-item input {
            width: 18px;
            height: 18px;
            accent-color: var(--primary-color);
        }

        /* 加载动画 */
        .loader {
            width: 48px;
            height: 48px;
            border: 5px solid var(--border-color);
            border-bottom-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 20px auto;
            display: none;
        }
        .loader.show {
            display: block;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* 弹窗样式 */
        .modal-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .modal-mask.show {
            opacity: 1;
            visibility: visible;
        }
        .modal-container {
            background-color: var(--card-bg);
            border-radius: var(--radius-lg);
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }
        .modal-mask.show .modal-container {
            transform: translateY(0);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            border-bottom: 1px solid var(--border-color);
        }
        .modal-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--primary-color);
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: var(--text-light);
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .modal-close:hover {
            background-color: var(--border-color);
            color: var(--text-primary);
        }
        .modal-body {
            padding: 24px;
        }
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 16px;
            padding: 16px 24px;
            border-top: 1px solid var(--border-color);
        }

        /* 提示消息样式 */
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: var(--radius-md);
            background-color: var(--card-bg);
            box-shadow: var(--shadow-hover);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9998;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        }
        .message.show {
            opacity: 1;
            transform: translateX(0);
        }
        .message-icon {
            font-size: 20px;
        }
        .message-success {
            border-left: 4px solid var(--success-color);
        }
        .message-success .message-icon {
            color: var(--success-color);
        }
        .message-error {
            border-left: 4px solid var(--danger-color);
        }
        .message-error .message-icon {
            color: var(--danger-color);
        }
        .message-warning {
            border-left: 4px solid var(--warning-color);
        }
        .message-warning .message-icon {
            color: var(--warning-color);
        }

        /* ===================== 布局样式 ===================== */
        .app-container {
            display: flex;
            min-height: 100vh;
        }

        /* 侧边栏样式 */
        .sidebar {
            width: 260px;
            background-color: var(--card-bg);
            box-shadow: var(--shadow);
            padding: 24px 0;
            display: flex;
            flex-direction: column;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
            z-index: 100;
        }
        .sidebar-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 24px 24px;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 16px;
        }
        .sidebar-logo img {
            width: 48px;
            height: 48px;
            margin-right: 12px;
        }
        .sidebar-logo-text {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-color);
            line-height: 1.2;
        }
        .sidebar-menu {
            list-style: none;
            padding: 0 16px;
            flex: 1;
        }
        .sidebar-menu-item {
            margin-bottom: 8px;
            border-radius: var(--radius-md);
        }
        .sidebar-menu-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            color: var(--text-primary);
            text-decoration: none;
            font-size: 16px;
            border-radius: var(--radius-md);
        }
        .sidebar-menu-link:hover {
            background-color: rgba(47, 85, 151, 0.05);
            color: var(--primary-color);
        }
        .sidebar-menu-link.active {
            background-color: var(--primary-color);
            color: #ffffff;
        }
        .sidebar-menu-icon {
            font-size: 20px;
            width: 24px;
            text-align: center;
        }
        .sidebar-footer {
            padding: 16px 24px;
            border-top: 1px solid var(--border-color);
            margin-top: 16px;
        }
        .sidebar-user {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .sidebar-user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
        }
        .sidebar-user-info {
            flex: 1;
        }
        .sidebar-user-name {
            font-size: 16px;
            font-weight: 500;
            color: var(--text-primary);
        }
        .sidebar-user-role {
            font-size: 12px;
            color: var(--text-light);
        }
        .theme-switch {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            background-color: var(--border-color);
            border-radius: var(--radius-md);
            margin-bottom: 8px;
        }
        .theme-switch-text {
            font-size: 14px;
            color: var(--text-secondary);
        }
        .theme-switch-toggle {
            position: relative;
            width: 40px;
            height: 20px;
            background-color: var(--text-light);
            border-radius: 10px;
            cursor: pointer;
        }
        .theme-switch-toggle::after {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #ffffff;
            top: 2px;
            left: 2px;
            transition: all 0.3s ease;
        }
        .theme-switch-toggle.active {
            background-color: var(--primary-color);
        }
        .theme-switch-toggle.active::after {
            left: 22px;
        }

        /* 主内容区样式 */
        .main-content {
            flex: 1;
            margin-left: 260px;
            padding: 24px;
        }
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
        }
        .page-title {
            font-size: 28px;
            font-weight: 700;
            color: var(--primary-color);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .page-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        /* 响应式布局 */
        @media (max-width: 992px) {
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            .sidebar.show {
                transform: translateX(0);
            }
            .main-content {
                margin-left: 0;
            }
            .mobile-menu-btn {
                display: block !important;
            }
        }
        .mobile-menu-btn {
            display: none;
            width: 40px;
            height: 40px;
            background-color: var(--primary-color);
            color: #ffffff;
            border: none;
            border-radius: var(--radius-md);
            font-size: 20px;
            cursor: pointer;
            position: fixed;
            top: 24px;
            left: 24px;
            z-index: 101;
        }

        /* ===================== 页面特有样式 ===================== */
        /* 首页样式 */
        .home-banner {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
            border-radius: var(--radius-xl);
            padding: 48px 32px;
            margin-bottom: 32px;
            color: #ffffff;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .home-banner::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
            opacity: 0.2;
        }
        .home-banner-title {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 16px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .home-banner-desc {
            font-size: 18px;
            max-width: 800px;
            margin: 0 auto 24px;
            line-height: 1.6;
        }
        .home-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
        }
        .home-stat-card {
            background-color: var(--card-bg);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            padding: 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .home-stat-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background-color: var(--primary-color);
        }
        .home-stat-value {
            font-size: 36px;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 8px;
        }
        .home-stat-label {
            font-size: 16px;
            color: var(--text-secondary);
        }
        .home-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 24px;
        }
        .home-card-item {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .home-card-icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: rgba(47, 85, 151, 0.1);
            color: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin-bottom: 16px;
        }
        .home-card-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--text-primary);
        }
        .home-card-desc {
            font-size: 16px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 16px;
            flex: 1;
        }

        /* 采集页样式 */
        .collection-page {
            display: none;
        }
        .collection-page.show {
            display: block;
        }
        .map-container {
            width: 100%;
            height: 480px;
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow);
            margin-bottom: 24px;
            position: relative;
        }
        .map-tip {
            position: absolute;
            top: 16px;
            left: 16px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 8px 16px;
            border-radius: var(--radius-md);
            font-size: 14px;
            color: var(--text-primary);
            box-shadow: var(--shadow);
            z-index: 10;
        }
        .map-controls {
            position: absolute;
            bottom: 16px;
            right: 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 10;
        }
        .map-control-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ffffff;
            border: none;
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            color: var(--primary-color);
        }
        .map-control-btn:hover {
            background-color: var(--primary-color);
            color: #ffffff;
        }

        /* 照片上传样式 */
        .photo-upload {
            border: 2px dashed var(--border-color);
            border-radius: var(--radius-md);
            padding: 32px;
            text-align: center;
            cursor: pointer;
            margin-bottom: 16px;
        }
        .photo-upload:hover {
            border-color: var(--primary-color);
            background-color: rgba(47, 85, 151, 0.05);
        }
        .photo-upload-icon {
            font-size: 48px;
            color: var(--text-light);
            margin-bottom: 16px;
        }
        .photo-upload-text {
            font-size: 16px;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
        .photo-upload-hint {
            font-size: 14px;
            color: var(--text-light);
        }
        .photo-preview-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        .photo-preview-item {
            position: relative;
            width: 100%;
            padding-top: 100%;
            border-radius: var(--radius-md);
            overflow: hidden;
            background-color: var(--border-color);
        }
        .photo-preview-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .photo-preview-remove {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: var(--danger-color);
            color: #ffffff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: var(--shadow);
        }

        /* 数据预览页样式 */
        .data-page {
            display: none;
        }
        .data-page.show {
            display: block;
        }
        .data-filter {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 24px;
            align-items: center;
        }
        .data-filter-item {
            flex: 1;
            min-width: 200px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            background-color: var(--card-bg);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow);
        }
        .data-table th, .data-table td {
            padding: 16px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        .data-table th {
            background-color: rgba(47, 85, 151, 0.05);
            font-weight: 600;
            color: var(--primary-color);
        }
        .data-table tr:hover {
            background-color: rgba(47, 85, 151, 0.02);
        }
        .data-table-actions {
            display: flex;
            gap: 8px;
        }
        .chart-container {
            width: 100%;
            height: 400px;
            margin-top: 24px;
        }

        /* 关于页样式 */
        .about-page {
            display: none;
        }
        .about-page.show {
            display: block;
        }
        .about-content {
            max-width: 800px;
            margin: 0 auto;
        }
        .about-section {
            margin-bottom: 32px;
        }
        .about-section-title {
            font-size: 24px;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .about-section-content {
            font-size: 16px;
            line-height: 1.8;
            color: var(--text-secondary);
        }
        .about-contact {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
            margin-top: 16px;
        }
        .about-contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background-color: rgba(47, 85, 151, 0.05);
            border-radius: var(--radius-md);
        }
        .about-contact-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        .about-contact-info {
            flex: 1;
        }
        .about-contact-label {
            font-size: 14px;
            color: var(--text-light);
            margin-bottom: 4px;
        }
        .about-contact-value {
            font-size: 16px;
            font-weight: 500;
            color: var(--text-primary);
        }

        /* 空数据样式 */
        .empty-data {
            text-align: center;
            padding: 64px 24px;
            color: var(--text-light);
        }
        .empty-data-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }
        .empty-data-text {
            font-size: 18px;
            margin-bottom: 8px;
        }
        .empty-data-desc {
            font-size: 16px;
            margin-bottom: 24px;
        }

        /* 成功页样式 */
        .success-page {
            display: none;
            text-align: center;
            padding: 64px 24px;
        }
        .success-page.show {
            display: block;
        }
        .success-icon {
            font-size: 96px;
            color: var(--success-color);
            margin-bottom: 24px;
        }
        .success-title {
            font-size: 32px;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 16px;
        }
        .success-desc {
            font-size: 18px;
            color: var(--text-secondary);
            margin-bottom: 32px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
    <!-- 移动端菜单按钮 -->
    <button class="mobile-menu-btn" onclick="toggleSidebar()">
        <i class="iconpark-icon" icon-name="menu"></i>
    </button>

    <!-- 整体容器 -->
    <div class="app-container">
        <!-- 侧边栏 -->
        <aside class="sidebar">
            <div class="sidebar-logo">
                <div style="width: 48px; height: 48px; border-radius: 8px; background: linear-gradient(135deg, #2f5597, #4a72b5); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                    <i class="iconpark-icon" icon-name="city"></i>
                </div>
                <div class="sidebar-logo-text">
                    舞钢市<br>城市体检平台
                </div>
            </div>

            <ul class="sidebar-menu">
                <li class="sidebar-menu-item">
                    <a href="#home" class="sidebar-menu-link active" onclick="switchPage('home')">
                        <i class="iconpark-icon sidebar-menu-icon" icon-name="home"></i>
                        <span>首页</span>
                    </a>
                </li>
                <li class="sidebar-menu-item">
                    <a href="#collection" class="sidebar-menu-link" onclick="switchPage('collection')">
                        <i class="iconpark-icon sidebar-menu-icon" icon-name="form"></i>
                        <span>信息采集</span>
                    </a>
                </li>
                <li class="sidebar-menu-item">
                    <a href="#data" class="sidebar-menu-link" onclick="switchPage('data')">
                        <i class="iconpark-icon sidebar-menu-icon" icon-name="chart"></i>
                        <span>数据预览</span>
                    </a>
                </li>
                <li class="sidebar-menu-item">
                    <a href="#about" class="sidebar-menu-link" onclick="switchPage('about')">
                        <i class="iconpark-icon sidebar-menu-icon" icon-name="info"></i>
                        <span>关于我们</span>
                    </a>
                </li>
                <li class="sidebar-menu-item">
                    <a href="#help" class="sidebar-menu-link" onclick="openModal('helpModal')">
                        <i class="iconpark-icon sidebar-menu-icon" icon-name="help"></i>
                        <span>帮助中心</span>
                    </a>
                </li>
                <li class="sidebar-menu-item">
                    <a href="#privacy" class="sidebar-menu-link" onclick="openModal('privacyModal')">
                        <i class="iconpark-icon sidebar-menu-icon" icon-name="shield"></i>
                        <span>隐私政策</span>
                    </a>
                </li>
            </ul>

            <div class="sidebar-footer">
                <div class="sidebar-user">
                    <div class="sidebar-user-avatar">
                        采
                    </div>
                    <div class="sidebar-user-info">
                        <div class="sidebar-user-name">信息采集员</div>
                        <div class="sidebar-user-role">普通用户</div>
                    </div>
                </div>

                <div class="theme-switch">
                    <span class="theme-switch-text">暗色模式</span>
                    <div class="theme-switch-toggle" id="themeToggle" onclick="toggleTheme()"></div>
                </div>

                <button class="btn btn-outline btn-sm w-100" onclick="clearAllData()">
                    <i class="iconpark-icon" icon-name="delete"></i>
                    清空本地数据
                </button>
            </div>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
            <!-- 首页 -->
            <div id="homePage" class="page-content">
                <div class="home-banner">
                    <h1 class="home-banner-title">舞钢市城市体检信息采集平台</h1>
                    <p class="home-banner-desc">
                        为全面掌握舞钢市城市建设现状，精准识别城市发展中的问题与短板，
                        特搭建本信息采集平台，面向社会公众征集住房、小区、社区、街区等方面的问题线索，
                        助力城市精细化管理与高质量发展。
                    </p>
                    <button class="btn btn-lg btn-secondary" onclick="switchPage('collection')">
                        <i class="iconpark-icon" icon-name="edit"></i>
                        立即采集信息
                    </button>
                </div>

                <div class="home-stats">
                    <div class="home-stat-card">
                        <div class="home-stat-value" id="totalRecords">0</div>
                        <div class="home-stat-label">累计采集记录</div>
                    </div>
                    <div class="home-stat-card">
                        <div class="home-stat-value" id="housingProblems">0</div>
                        <div class="home-stat-label">住房问题</div>
                    </div>
                    <div class="home-stat-card">
                        <div class="home-stat-value" id="communityProblems">0</div>
                        <div class="home-stat-label">小区问题</div>
                    </div>
                    <div class="home-stat-card">
                        <div class="home-stat-value" id="streetProblems">0</div>
                        <div class="home-stat-label">街区问题</div>
                    </div>
                </div>

                <div class="home-cards">
                    <!-- 住房卡片 -->
                    <div class="card home-card-item">
                        <div class="card-body">
                            <div class="home-card-icon">
                                <i class="iconpark-icon" icon-name="house"></i>
                            </div>
                            <h3 class="home-card-title">住房</h3>
                            <p class="home-card-desc">
                                针对居民住房内部出现的墙体开裂、燃气老化、飘窗安全等问题进行采集，
                                精准定位问题位置，上传现场照片，为住房安全排查提供数据支撑。
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline" onclick="gotoCollection('住房问题')">
                                <i class="iconpark-icon" icon-name="arrow-right"></i>
                                开始采集
                            </button>
                        </div>
                    </div>

                    <!-- 小区（社区）卡片 -->
                    <div class="card home-card-item">
                        <div class="card-body">
                            <div class="home-card-icon">
                                <i class="iconpark-icon" icon-name="community"></i>
                            </div>
                            <h3 class="home-card-title">小区（社区）</h3>
                            <p class="home-card-desc">
                                聚焦小区公共区域设施、环境、安全等方面的问题，如公共墙体开裂、
                                燃气管道老化、飘窗安全隐患等，助力小区精细化管理。
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline" onclick="gotoCollection('小区问题')">
                                <i class="iconpark-icon" icon-name="arrow-right"></i>
                                开始采集
                            </button>
                        </div>
                    </div>

                    <!-- 街区卡片 -->
                    <div class="card home-card-item">
                        <div class="card-body">
                            <div class="home-card-icon">
                                <i class="iconpark-icon" icon-name="street"></i>
                            </div>
                            <h3 class="home-card-title">街区</h3>
                            <p class="home-card-desc">
                                针对街区范围内的公共服务、基础设施、环境治理等问题进行采集，
                                为街区治理和服务提升提供决策依据。
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline" onclick="gotoCollection('街区问题')">
                                <i class="iconpark-icon" icon-name="arrow-right"></i>
                                开始采集
                            </button>
                        </div>
                    </div>

                    <!-- 城区卡片 -->
                    <div class="card home-card-item">
                        <div class="card-body">
                            <div class="home-card-icon">
                                <i class="iconpark-icon" icon-name="city"></i>
                            </div>
                            <h3 class="home-card-title">城区</h3>
                            <p class="home-card-desc">
                                面向城市城区范围内的公共设施、市容环境、交通出行等综合性问题进行采集，
                                助力提升城市整体品质和居民生活体验。
                            </p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline" onclick="gotoCollection('城区问题')">
                                <i class="iconpark-icon" icon-name="arrow-right"></i>
                                开始采集
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-top: 32px;">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="iconpark-icon" icon-name="chart-line"></i>
                            采集数据统计
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="statsChart" class="chart-container"></div>
                    </div>
                </div>
            </div>

            <!-- 信息采集页 -->
            <div id="collectionPage" class="collection-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <i class="iconpark-icon" icon-name="form"></i>
                        信息采集
                    </h2>
                    <div class="page-actions">
                        <button class="btn btn-outline btn-sm" onclick="resetCollectionForm()">
                            <i class="iconpark-icon" icon-name="refresh"></i>
                            重置表单
                        </button>
                        <button class="btn btn-sm" onclick="switchPage('home')">
                            <i class="iconpark-icon" icon-name="arrow-left"></i>
                            返回首页
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="iconpark-icon" icon-name="location"></i>
                            位置选择
                            <span id="currentProblemType" style="font-size: 16px; color: var(--text-secondary); margin-left: 12px;">- 请选择问题类型 -</span>
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="map-container" id="mapContainer">
                            <div class="map-tip">
                                <i class="iconpark-icon" icon-name="tips"></i>
                                点击地图选择问题位置，或点击右下角按钮重新定位
                            </div>
                            <div class="map-controls">
                                <button class="map-control-btn" id="locateBtn" onclick="getCurrentLocation()">
                                    <i class="iconpark-icon" icon-name="location"></i>
                                </button>
                                <button class="map-control-btn" id="satelliteBtn" onclick="toggleSatellite()">
                                    <i class="iconpark-icon" icon-name="earth"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label form-label-required">定位精度</label>
                            <div class="radio-group">
                                <label class="radio-item">
                                    <input type="radio" name="locationAccuracy" value="高精度" checked> 高精度（GPS/北斗）
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="locationAccuracy" value="普通精度"> 普通精度（网络定位）
                                </label>
                            </div>
                            <div class="form-text">
                                高精度定位需要开启设备GPS，定位结果更准确；普通精度仅需网络，适合室内环境。
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">定位坐标</label>
                            <div style="display: flex; gap: 16px;">
                                <div style="flex: 1;">
                                    <input type="text" class="form-control" id="longitudeInput" placeholder="经度" readonly>
                                </div>
                                <div style="flex: 1;">
                                    <input type="text" class="form-control" id="latitudeInput" placeholder="纬度" readonly>
                                </div>
                            </div>
                            <div class="form-text">
                                点击地图后自动填充，无需手动输入
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="iconpark-icon" icon-name="edit"></i>
                            问题信息
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label form-label-required">问题类型</label>
                            <div class="radio-group">
                                <label class="radio-item">
                                    <input type="radio" name="problemType" value="住房问题" onchange="updateProblemType()"> 住房问题
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="problemType" value="小区问题" onchange="updateProblemType()"> 小区问题
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="problemType" value="社区问题" onchange="updateProblemType()"> 社区问题
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="problemType" value="街区问题" onchange="updateProblemType()"> 街区问题
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="problemType" value="城区问题" onchange="updateProblemType()"> 城区问题
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label form-label-required">具体问题</label>
                            <div class="radio-group">
                                <label class="radio-item">
                                    <input type="radio" name="detailProblem" value="墙体结构开裂" checked> 墙体结构开裂
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="detailProblem" value="燃气老化开裂"> 燃气老化开裂
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="detailProblem" value="有飘窗"> 有飘窗
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="detailProblem" value="其他问题" onchange="toggleOtherProblem()"> 其他问题
                                </label>
                            </div>
                        </div>

                        <div class="form-group" id="otherProblemGroup" style="display: none;">
                            <label class="form-label form-label-required">其他问题描述</label>
                            <textarea class="form-control" id="otherProblemInput" rows="3" placeholder="请详细描述具体问题..."></textarea>
                        </div>

                        <div class="form-group">
                            <label class="form-label form-label-required">所在小区/位置</label>
                            <input type="text" class="form-control" id="communityInput" placeholder="请输入具体小区名称或详细位置" onblur="validateCommunity()">
                            <div class="form-error" id="communityError">请输入小区名称或详细位置</div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">联系人</label>
                            <input type="text" class="form-control" id="contactNameInput" placeholder="请输入您的姓名（选填）">
                        </div>

                        <div class="form-group">
                            <label class="form-label">联系电话</label>
                            <input type="text" class="form-control" id="contactPhoneInput" placeholder="请输入您的联系电话（选填）" onblur="validatePhone()">
                            <div class="form-error" id="phoneError">请输入正确的手机号码</div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">紧急程度</label>
                            <div class="radio-group">
                                <label class="radio-item">
                                    <input type="radio" name="urgencyLevel" value="低" checked> 低（不影响正常使用）
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="urgencyLevel" value="中"> 中（轻微影响使用）
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="urgencyLevel" value="高"> 高（严重影响安全）
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">发现时间</label>
                            <input type="date" class="form-control" id="discoveryDateInput" value="">
                            <div class="form-text">
                                默认为当前日期，可手动选择问题发现的具体时间
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">问题详细描述</label>
                            <textarea class="form-control" id="problemDescInput" rows="4" placeholder="请详细描述问题的具体情况、影响范围、已采取的措施等（选填）"></textarea>
                        </div>

                        <div class="form-group">
                            <label class="form-label form-label-required">现场照片</label>
                            <input type="file" id="photoInput" accept="image/*" multiple style="display: none;" onchange="handlePhotoUpload(this)">
                            <div class="photo-upload" onclick="document.getElementById('photoInput').click()">
                                <div class="photo-upload-icon">
                                    <i class="iconpark-icon" icon-name="camera"></i>
                                </div>
                                <div class="photo-upload-text">点击上传照片</div>
                                <div class="photo-upload-hint">支持JPG/PNG格式，最多上传9张，单张不超过10MB</div>
                            </div>
                            <div class="form-error" id="photoError">请至少上传一张现场照片</div>
                            <div class="photo-preview-list" id="photoPreviewList"></div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">是否需要回访</label>
                            <div class="radio-group">
                                <label class="radio-item">
                                    <input type="radio" name="needCallback" value="是" checked> 是，希望工作人员回访
                                </label>
                                <label class="radio-item">
                                    <input type="radio" name="needCallback" value="否"> 否，仅提供信息
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-danger" onclick="resetCollectionForm()">
                            <i class="iconpark-icon" icon-name="delete"></i>
                            重置
                        </button>
                        <button class="btn btn-success" id="submitBtn" disabled onclick="submitCollectionForm()">
                            <i class="iconpark-icon" icon-name="check"></i>
                            提交信息
                        </button>
                    </div>
                </div>
            </div>

            <!-- 数据预览页 -->
            <div id="dataPage" class="data-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <i class="iconpark-icon" icon-name="chart"></i>
                        采集数据预览
                    </h2>
                    <div class="page-actions">
                        <button class="btn btn-outline btn-sm" onclick="exportData()">
                            <i class="iconpark-icon" icon-name="download"></i>
                            导出数据
                        </button>
                        <button class="btn btn-sm" onclick="switchPage('home')">
                            <i class="iconpark-icon" icon-name="arrow-left"></i>
                            返回首页
                        </button>
                    </div>
                </div>

                <div class="data-filter">
                    <div class="data-filter-item">
                        <label class="form-label">问题类型筛选</label>
                        <select class="form-control" id="problemTypeFilter" onchange="filterData()">
                            <option value="all">全部类型</option>
                            <option value="住房问题">住房问题</option>
                            <option value="小区问题">小区问题</option>
                            <option value="社区问题">社区问题</option>
                            <option value="街区问题">街区问题</option>
                            <option value="城区问题">城区问题</option>
                        </select>
                    </div>
                    <div class="data-filter-item">
                        <label class="form-label">紧急程度筛选</label>
                        <select class="form-control" id="urgencyFilter" onchange="filterData()">
                            <option value="all">全部级别</option>
                            <option value="低">低</option>
                            <option value="中">中</option>
                            <option value="高">高</option>
                        </select>
                    </div>
                    <div class="data-filter-item">
                        <label class="form-label">时间范围筛选</label>
                        <input type="date" class="form-control" id="dateFilterStart" placeholder="开始日期" onchange="filterData()">
                    </div>
                    <div class="data-filter-item">
                        <label class="form-label">&nbsp;</label>
                        <input type="date" class="form-control" id="dateFilterEnd" placeholder="结束日期" onchange="filterData()">
                    </div>
                    <div class="data-filter-item" style="align-self: flex-end;">
                        <button class="btn btn-sm" onclick="resetFilter()">
                            <i class="iconpark-icon" icon-name="refresh"></i>
                            重置筛选
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="iconpark-icon" icon-name="table"></i>
                            采集记录列表
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="dataTableContainer">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>问题类型</th>
                                        <th>具体问题</th>
                                        <th>小区/位置</th>
                                        <th>紧急程度</th>
                                        <th>提交时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody id="dataTableBody">
                                    <!-- 数据动态生成 -->
                                </tbody>
                            </table>
                        </div>
                        <div class="empty-data" id="emptyData" style="display: none;">
                            <div class="empty-data-icon">
                                <i class="iconpark-icon" icon-name="empty"></i>
                            </div>
                            <div class="empty-data-text">暂无采集数据</div>
                            <div class="empty-data-desc">您还没有提交任何采集记录，快去首页开始采集吧！</div>
                            <button class="btn" onclick="switchPage('collection')">
                                <i class="iconpark-icon" icon-name="edit"></i>
                                开始采集
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="iconpark-icon" icon-name="chart-pie"></i>
                            问题类型分布
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="problemTypeChart" class="chart-container"></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="iconpark-icon" icon-name="chart-bar"></i>
                            紧急程度分布
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="urgencyChart" class="chart-container"></div>
                    </div>
                </div>
            </div>

            <!-- 关于我们页 -->
            <div id="aboutPage" class="about-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <i class="iconpark-icon" icon-name="info"></i>
                        关于我们
                    </h2>
                    <div class="page-actions">
                        <button class="btn btn-sm" onclick="switchPage('home')">
                            <i class="iconpark-icon" icon-name="arrow-left"></i>
                            返回首页
                        </button>
                    </div>
                </div>

                <div class="card about-content">
                    <div class="about-section">
                        <h3 class="about-section-title">
                            <i class="iconpark-icon" icon-name="goal"></i>
                            平台简介
                        </h3>
                        <div class="about-section-content">
                            <p>舞钢市城市体检信息采集平台是由舞钢市城市管理局主导开发的一款面向公众的信息采集工具，旨在通过社会共治的方式，全面、精准、高效地收集城市建设和管理中的各类问题线索，为城市体检、城市更新、精细化管理提供数据支撑和决策依据。</p>
                            <br>
                            <p>平台聚焦住房、小区（社区）、街区、城区四大场景，重点采集墙体结构开裂、燃气老化开裂、飘窗安全等民生相关问题，支持位置定位、照片上传、信息描述等功能，操作简单便捷，数据实时存储。</p>
                        </div>
                    </div>

                    <div class="about-section">
                        <h3 class="about-section-title">
                            <i class="iconpark-icon" icon-name="mission"></i>
                            建设目标
                        </h3>
                        <div class="about-section-content">
                            <ul style="padding-left: 20px; margin-top: 8px;">
                                <li>构建全民参与的城市治理格局，打通城市管理的"最后一公里"；</li>
                                <li>建立城市问题动态数据库，实现问题发现、上报、处置、反馈的闭环管理；</li>
                                <li>提升城市精细化管理水平，改善居民生活环境和居住品质；</li>
                                <li>为城市体检和城市更新提供精准的数据支撑和民意参考。</li>
                            </ul>
                        </div>
                    </div>

                    <div class="about-section">
                        <h3 class="about-section-title">
                            <i class="iconpark-icon" icon-name="rule"></i>
                            数据说明
                        </h3>
                        <div class="about-section-content">
                            <p>1. 您提交的所有信息仅用于舞钢市城市管理和城市体检工作，我们将严格遵守《中华人民共和国个人信息保护法》，保护您的个人隐私；</p>
                            <br>
                            <p>2. 位置信息仅用于问题定位，不会用于其他商业用途；</p>
                            <br>
                            <p>3. 照片等多媒体资料仅用于问题核实和处置，处置完成后将按照相关规定保存或销毁；</p>
                            <br>
                            <p>4. 您可以随时查看、编辑、删除自己提交的采集记录。</p>
                        </div>
                    </div>

                    <div class="about-section">
                        <h3 class="about-section-title">
                            <i class="iconpark-icon" icon-name="phone"></i>
                            联系方式
                        </h3>
                        <div class="about-contact">
                            <div class="about-contact-item">
                                <div class="about-contact-icon">
                                    <i class="iconpark-icon" icon-name="phone"></i>
                                </div>
                                <div class="about-contact-info">
                                    <div class="about-contact-label">联系电话</div>
                                    <div class="about-contact-value">0375-12345678</div>
                                </div>
                            </div>
                            <div class="about-contact-item">
                                <div class="about-contact-icon">
                                    <i class="iconpark-icon" icon-name="email"></i>
                                </div>
                                <div class="about-contact-info">
                                    <div class="about-contact-label">电子邮箱</div>
                                    <div class="about-contact-value">wgcsjc@163.com</div>
                                </div>
                            </div>
                            <div class="about-contact-item">
                                <div class="about-contact-icon">
                                    <i class="iconpark-icon" icon-name="address"></i>
                                </div>
                                <div class="about-contact-info">
                                    <div class="about-contact-label">办公地址</div>
                                    <div class="about-contact-value">舞钢市行政中心1号楼5楼</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 提交成功页 -->
            <div id="successPage" class="success-page">
                <div class="success-icon">
                    <i class="iconpark-icon"
