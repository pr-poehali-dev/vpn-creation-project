import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const servers = [
  { country: 'США', city: 'Нью-Йорк', ping: '12ms', load: 'low' },
  { country: 'Германия', city: 'Берлин', ping: '25ms', load: 'medium' },
  { country: 'Япония', city: 'Токио', ping: '45ms', load: 'low' },
  { country: 'Великобритания', city: 'Лондон', ping: '18ms', load: 'high' },
  { country: 'Канада', city: 'Торонто', ping: '22ms', load: 'low' },
  { country: 'Австралия', city: 'Сидней', ping: '67ms', load: 'medium' },
];

const plans = [
  {
    name: 'Базовый',
    price: '299₽',
    period: 'мес',
    features: ['1 устройство', '50+ серверов', 'Базовая скорость', 'Email поддержка']
  },
  {
    name: 'Премиум',
    price: '599₽',
    period: 'мес',
    features: ['5 устройств', '100+ серверов', 'Максимальная скорость', 'P2P поддержка', '24/7 поддержка'],
    popular: true
  },
  {
    name: 'Семейный',
    price: '999₽',
    period: 'мес',
    features: ['10 устройств', '150+ серверов', 'Безлимитная скорость', 'Все протоколы', 'Приоритетная поддержка']
  }
];

const reviews = [
  {
    name: 'Алексей М.',
    rating: 5,
    text: 'Отличный VPN! Стабильное соединение и высокая скорость. Рекомендую!',
    country: 'Россия'
  },
  {
    name: 'Мария К.',
    rating: 5,
    text: 'Пользуюсь уже полгода. Никаких проблем, все работает как часы.',
    country: 'Украина'
  },
  {
    name: 'Дмитрий П.',
    rating: 4,
    text: 'Хороший сервис, быстрые серверы. Иногда бывают небольшие задержки.',
    country: 'Беларусь'
  }
];

export default function Index() {
  const [selectedServer, setSelectedServer] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    if (selectedServer) {
      setIsConnected(!isConnected);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-dark-purple to-dark-gray">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                CyberVPN
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground/80 hover:text-neon-cyan transition-colors">Главная</a>
              <a href="#pricing" className="text-foreground/80 hover:text-neon-cyan transition-colors">Тарифы</a>
              <a href="#servers" className="text-foreground/80 hover:text-neon-cyan transition-colors">Серверы</a>
              <a href="#reviews" className="text-foreground/80 hover:text-neon-cyan transition-colors">Отзывы</a>
              <a href="#support" className="text-foreground/80 hover:text-neon-cyan transition-colors">Поддержка</a>
            </div>
            <Button variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black neon-glow">
              Войти
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 neon-text animate-pulse-neon">
            Безопасный интернет
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta bg-clip-text text-transparent">
              без границ
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Защитите свою конфиденциальность с помощью передового VPN-сервиса. 
            Высокая скорость, надежное шифрование и серверы по всему миру.
          </p>
          
          {/* Server Selection */}
          <div className="max-w-md mx-auto mb-8">
            <div className="gradient-border">
              <div className="p-6 bg-card rounded-lg">
                <div className="flex items-center mb-4">
                  <Icon name="Globe2" className="text-neon-cyan mr-2" />
                  <span className="text-sm font-medium">Выберите сервер</span>
                </div>
                <Select value={selectedServer} onValueChange={setSelectedServer}>
                  <SelectTrigger className="w-full border-neon-cyan/30">
                    <SelectValue placeholder="Выберите локацию" />
                  </SelectTrigger>
                  <SelectContent>
                    {servers.map((server, index) => (
                      <SelectItem key={index} value={`${server.country}-${server.city}`}>
                        <div className="flex items-center justify-between w-full">
                          <span>{server.country} - {server.city}</span>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge 
                              variant={server.load === 'low' ? 'default' : server.load === 'medium' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {server.ping}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleConnect}
                  disabled={!selectedServer}
                  className={`w-full mt-4 ${isConnected 
                    ? 'bg-green-600 hover:bg-green-700 neon-glow' 
                    : 'bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan neon-glow'
                  } transition-all duration-300`}
                >
                  <Icon name={isConnected ? "ShieldCheck" : "Shield"} className="mr-2" />
                  {isConnected ? 'Отключиться' : 'Подключиться'}
                </Button>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          {isConnected && (
            <div className="max-w-sm mx-auto mb-8 animate-fade-in">
              <Card className="bg-green-900/20 border-green-500/30 neon-glow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                    <span className="text-green-400 font-medium">Подключено к {selectedServer}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-card/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 neon-text">Тарифные планы</h2>
            <p className="text-muted-foreground">Выберите план, который подходит именно вам</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'gradient-border scale-105' : 'border-border/20'} hover:scale-105 transition-transform duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-medium">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-neon-cyan">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Icon name="Check" className="text-neon-cyan mr-3 flex-shrink-0" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan neon-glow' 
                    : 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black'
                  }`} variant={plan.popular ? 'default' : 'outline'}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section id="servers" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 neon-text">Наши серверы</h2>
            <p className="text-muted-foreground">Быстрые и надежные серверы по всему миру</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {servers.map((server, index) => (
              <Card key={index} className="border-border/20 hover:border-neon-cyan/50 transition-colors duration-300 hover:neon-glow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{server.country}</CardTitle>
                    <Badge 
                      variant={server.load === 'low' ? 'default' : server.load === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {server.load === 'low' ? 'Низкая' : server.load === 'medium' ? 'Средняя' : 'Высокая'} нагрузка
                    </Badge>
                  </div>
                  <CardDescription>{server.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="Zap" className="text-neon-cyan mr-2" size={16} />
                      <span className="text-sm">Пинг: {server.ping}</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-black">
                      Подключиться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-card/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 neon-text">Отзывы клиентов</h2>
            <p className="text-muted-foreground">Что говорят наши пользователи</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="border-border/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={16} />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 neon-text">Поддержка 24/7</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Наша команда поддержки готова помочь вам в любое время. 
            Свяжитесь с нами любым удобным способом.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/20 hover:border-neon-cyan/50 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <Icon name="Mail" className="text-neon-cyan mx-auto mb-4" size={32} />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">support@cybervpn.ru</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/20 hover:border-neon-cyan/50 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <Icon name="MessageCircle" className="text-neon-cyan mx-auto mb-4" size={32} />
                <h3 className="font-semibold mb-2">Онлайн чат</h3>
                <p className="text-sm text-muted-foreground">Доступен 24/7</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/20 hover:border-neon-cyan/50 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <Icon name="Phone" className="text-neon-cyan mx-auto mb-4" size={32} />
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-sm text-muted-foreground">+7 (800) 123-45-67</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-neon-cyan to-neon-purple rounded"></div>
              <span className="font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                CyberVPN
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                Условия использования
              </a>
            </div>
          </div>
          <div className="text-center mt-6 text-muted-foreground text-sm">
            © 2024 CyberVPN. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}