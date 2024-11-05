import { Avatar } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function LeftCardSide() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Placeholder user data
  const user = {
    name: "Johnmack Faeldonia",
    avatar: "https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/452912470_2526121527595306_3752199441102383149_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtCgs-XyXL89ENkqy7JG3peWlRnJXahMF5aVGcldqEwU1hJd6qhyhKUGWsK52KiDE16tK8oTnAWiBcfTghtwJt&_nc_ohc=0aFGsrCXi6EQ7kNvgGeDTFV&_nc_zt=23&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=ANu0xv9z85XR0ENGh62yylc&oh=00_AYBGZKYtxIFtM7UfMbbYyIGbDTDRHZIUjJCb0LPeVAY0kg&oe=670F8366",
    bio: "Aspiring software engineer with a passion for AI and machine learning.",
    information: {
      role: "Student",
      createdAt: "May 8, 2024",
    }
  };

  return (
    <div className="w-0 md:w-64 lg:w-64 bg-background p-6 flex flex-col space-y-6 border-r h-screen overflow-y-auto sticky top-16">
      <div className="flex flex-col items-center space-y-4">
        <Avatar size={80} src={user.avatar} icon={<UserOutlined />} />
        <div className="text-center">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.information.role}</p>
        </div>
      </div>
      <p className="text-sm text-center text-muted-foreground">{user.bio}</p>
      <div className="space-y-2">
        <Button 
          type="dashed" 
          block 
          icon={<UserOutlined />}
          onClick={() => navigate('/profile')} // Navigate to Profile page
        >
          Profile
        </Button>
        <Button 
          type="dashed" 
          block 
          icon={<SettingOutlined />}
          onClick={() => navigate('/settings')} // Navigate to Account Settings
        >
          Account Settings
        </Button>
      </div>
      <div className="mt-auto text-xs text-muted-foreground space-y-1">
        <p>Member since {user.information.createdAt}</p>
        <p>ConnectEd 2024</p>
      </div>
    </div>
  );
}
