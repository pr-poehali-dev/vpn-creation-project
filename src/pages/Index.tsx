import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const servers = [
  { country: 'USA', city: 'New York', flag: '🇺🇸', ping: 12, x: 25, y: 35 },
  { country: 'Germany', city: 'Berlin', flag: '🇩🇪', ping: 25, x: 55, y: 30 },
  { country: 'Japan', city: 'Tokyo', flag: '🇯🇵', ping: 45, x: 85, y: 40 },
  { country: 'UK', city: 'London', flag: '🇬🇧', ping: 18, x: 50, y: 28 },
  { country: 'Canada', city: 'Toronto', flag: '🇨🇦', ping: 22, x: 20, y: 30 },
  { country: 'Australia', city: 'Sydney', flag: '🇦🇺', ping: 67, x: 85, y: 75 }
];



export default function Index() {
  const [selectedServer, setSelectedServer] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userLocation] = useState({ country: 'Russia', flag: '🇷🇺' });
  const [connectionTime, setConnectionTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = () => {
    if (selectedServer) {
      setIsConnected(!isConnected);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedServerData = servers.find(s => `${s.country}-${s.city}` === selectedServer);

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto space-y-4">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Icon name="Shield" size={14} className="text-background" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MiniVPN
            </span>
          </div>
        </div>

        {/* Status Card */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-4">
            {/* Connection Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Подключено' : 'Отключено'}
                </span>
              </div>
              {isConnected && (
                <Badge variant="secondary" className="text-xs">
                  {formatTime(connectionTime)}
                </Badge>
              )}
            </div>

            {/* Location Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{isConnected ? selectedServerData?.flag : userLocation.flag}</span>
                <div>
                  <div className="text-sm font-medium">
                    {isConnected ? selectedServerData?.country : userLocation.country}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isConnected ? selectedServerData?.city : 'Москва'}
                  </div>
                </div>
              </div>
              {isConnected && selectedServerData && (
                <Badge variant="outline" className="text-xs">
                  {selectedServerData.ping}ms
                </Badge>
              )}
            </div>

            {/* Mini World Map */}
            <div className="relative bg-muted/20 rounded-lg h-24 mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
              
              {/* Server Points */}
              {servers.map((server, index) => (
                <div
                  key={index}
                  className={`absolute w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedServer === `${server.country}-${server.city}`
                      ? 'bg-primary scale-150 animate-pulse'
                      : 'bg-muted-foreground/60 hover:bg-primary hover:scale-125'
                  }`}
                  style={{ left: `${server.x}%`, top: `${server.y}%` }}
                  onClick={() => setSelectedServer(`${server.country}-${server.city}`)}
                  title={`${server.country} - ${server.city}`}
                />
              ))}

              {/* Connection Line */}
              {isConnected && selectedServerData && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="15%"
                    y1="50%"
                    x2={`${selectedServerData.x}%`}
                    y2={`${selectedServerData.y}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    className="animate-pulse"
                  />
                </svg>
              )}
              
              {/* User Location */}
              <div
                className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{ left: '15%', top: '50%' }}
                title="Ваше местоположение"
              />
            </div>

            {/* Server Selection */}
            <Select value={selectedServer} onValueChange={setSelectedServer}>
              <SelectTrigger className="w-full mb-3 h-9 text-sm">
                <SelectValue placeholder="Выберите сервер" />
              </SelectTrigger>
              <SelectContent>
                {servers.map((server, index) => (
                  <SelectItem key={index} value={`${server.country}-${server.city}`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <span>{server.flag}</span>
                        <span className="text-sm">{server.country} - {server.city}</span>
                      </div>
                      <Badge 
                        variant={server.ping < 20 ? 'default' : server.ping < 40 ? 'secondary' : 'destructive'}
                        className="text-xs ml-2"
                      >
                        {server.ping}ms
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Connect Button */}
            <Button 
              onClick={handleConnect}
              disabled={!selectedServer}
              className={`w-full h-10 ${isConnected 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary'
              } transition-all duration-300`}
            >
              <Icon name={isConnected ? "ShieldX" : "Shield"} className="mr-2" size={16} />
              {isConnected ? 'Отключиться' : 'Подключиться'}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <CardContent className="p-3 text-center">
              <Icon name="Zap" className="text-primary mx-auto mb-1" size={16} />
              <div className="text-xs text-muted-foreground">Скорость</div>
              <div className="text-sm font-bold">
                {isConnected ? '125 Мбит/с' : '--'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 text-center">
              <Icon name="Download" className="text-accent mx-auto mb-1" size={16} />
              <div className="text-xs text-muted-foreground">Загружено</div>
              <div className="text-sm font-bold">
                {isConnected ? '2.4 ГБ' : '--'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 text-center">
              <Icon name="Upload" className="text-secondary mx-auto mb-1" size={16} />
              <div className="text-xs text-muted-foreground">Отправлено</div>
              <div className="text-sm font-bold">
                {isConnected ? '890 МБ' : '--'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Settings" size={14} className="mr-1" />
            Настройки
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="HelpCircle" size={14} className="mr-1" />
            Помощь
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Защищено 256-bit шифрованием</span>
          </div>
        </div>
      </div>
    </div>
  );
}