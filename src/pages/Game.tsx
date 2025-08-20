import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TokenGate from "@/components/TokenGate";
import { WalletSelector } from "@/components/WalletSelector";
import { useWallet } from "@/hooks/useWallet";
import { useMuratToken } from "@/hooks/useMuratToken";
import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Coins, 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  Star,
  Target
} from "lucide-react";

interface GameState {
  score: number;
  level: number;
  lives: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  playerPosition: { x: number; y: number };
  coins: Array<{ x: number; y: number; collected: boolean; id: number }>;
  obstacles: Array<{ x: number; y: number; id: number }>;
  powerUps: Array<{ x: number; y: number; type: string; id: number }>;
  timeLeft: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 30;
const COIN_SIZE = 20;
const OBSTACLE_SIZE = 25;

const Game = () => {
  const { isConnected } = useWallet();
  const { hasAccess } = useMuratToken();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    isPlaying: false,
    isPaused: false,
    gameOver: false,
    playerPosition: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 },
    coins: [],
    obstacles: [],
    powerUps: [],
    timeLeft: 60
  });

  const [keys, setKeys] = useState<Set<string>>(new Set());
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cryptoChaseHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Save high score
  useEffect(() => {
    if (gameState.score > highScore) {
      setHighScore(gameState.score);
      localStorage.setItem('cryptoChaseHighScore', gameState.score.toString());
    }
  }, [gameState.score, highScore]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Generate random coins
  const generateCoins = useCallback((count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * (GAME_WIDTH - COIN_SIZE),
      y: Math.random() * (GAME_HEIGHT - 100) + 50,
      collected: false,
      id: Date.now() + i
    }));
  }, []);

  // Generate obstacles
  const generateObstacles = useCallback((count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * (GAME_WIDTH - OBSTACLE_SIZE),
      y: Math.random() * (GAME_HEIGHT - 200) + 100,
      id: Date.now() + i
    }));
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    setGameState({
      score: 0,
      level: 1,
      lives: 3,
      isPlaying: true,
      isPaused: false,
      gameOver: false,
      playerPosition: { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 },
      coins: generateCoins(5),
      obstacles: generateObstacles(3),
      powerUps: [],
      timeLeft: 60
    });
  }, [generateCoins, generateObstacles]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.gameOver) return;

    setGameState(prev => {
      const newState = { ...prev };
      
      // Player movement
      const speed = 5;
      if (keys.has('arrowleft') || keys.has('a')) {
        newState.playerPosition.x = Math.max(0, newState.playerPosition.x - speed);
      }
      if (keys.has('arrowright') || keys.has('d')) {
        newState.playerPosition.x = Math.min(GAME_WIDTH - PLAYER_SIZE, newState.playerPosition.x + speed);
      }
      if (keys.has('arrowup') || keys.has('w')) {
        newState.playerPosition.y = Math.max(0, newState.playerPosition.y - speed);
      }
      if (keys.has('arrowdown') || keys.has('s')) {
        newState.playerPosition.y = Math.min(GAME_HEIGHT - PLAYER_SIZE, newState.playerPosition.y + speed);
      }

      // Check coin collection
      newState.coins = newState.coins.map(coin => {
        if (!coin.collected) {
          const distance = Math.sqrt(
            Math.pow(coin.x - newState.playerPosition.x, 2) +
            Math.pow(coin.y - newState.playerPosition.y, 2)
          );
          if (distance < COIN_SIZE + PLAYER_SIZE / 2) {
            newState.score += 10;
            return { ...coin, collected: true };
          }
        }
        return coin;
      });

      // Check obstacle collision
      const playerCollision = newState.obstacles.some(obstacle => {
        const distance = Math.sqrt(
          Math.pow(obstacle.x - newState.playerPosition.x, 2) +
          Math.pow(obstacle.y - newState.playerPosition.y, 2)
        );
        return distance < OBSTACLE_SIZE + PLAYER_SIZE / 2;
      });

      if (playerCollision) {
        newState.lives -= 1;
        newState.playerPosition = { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 };
        
        if (newState.lives <= 0) {
          newState.gameOver = true;
          newState.isPlaying = false;
        }
      }

      // Check if all coins collected
      const coinsLeft = newState.coins.filter(coin => !coin.collected).length;
      if (coinsLeft === 0) {
        newState.level += 1;
        newState.coins = generateCoins(5 + newState.level);
        newState.obstacles = generateObstacles(2 + newState.level);
        newState.timeLeft = 60;
      }

      // Decrease time
      newState.timeLeft = Math.max(0, newState.timeLeft - 0.016);
      if (newState.timeLeft <= 0) {
        newState.gameOver = true;
        newState.isPlaying = false;
      }

      return newState;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.isPlaying, gameState.isPaused, gameState.gameOver, keys, generateCoins, generateObstacles]);

  // Start game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && !gameState.gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop, gameState.isPlaying, gameState.isPaused, gameState.gameOver]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0b';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw grid background
    ctx.strokeStyle = '#1a1a1b';
    ctx.lineWidth = 1;
    for (let x = 0; x < GAME_WIDTH; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GAME_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < GAME_HEIGHT; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GAME_WIDTH, y);
      ctx.stroke();
    }

    // Draw coins
    gameState.coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillStyle = '#f7931a';
        ctx.beginPath();
        ctx.arc(coin.x + COIN_SIZE / 2, coin.y + COIN_SIZE / 2, COIN_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Bitcoin symbol
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('₿', coin.x + COIN_SIZE / 2, coin.y + COIN_SIZE / 2 + 4);
      }
    });

    // Draw obstacles
    ctx.fillStyle = '#dc2626';
    gameState.obstacles.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, OBSTACLE_SIZE, OBSTACLE_SIZE);
    });

    // Draw player
    ctx.fillStyle = '#10b981';
    ctx.fillRect(
      gameState.playerPosition.x, 
      gameState.playerPosition.y, 
      PLAYER_SIZE, 
      PLAYER_SIZE
    );

    // Player emoji
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏃', gameState.playerPosition.x + PLAYER_SIZE / 2, gameState.playerPosition.y + PLAYER_SIZE / 2 + 7);
  });

  const handleStartGame = () => {
    if (!isConnected || !hasAccess) return;
    initializeGame();
  };

  const handlePauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleResetGame = () => {
    setGameState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      isPaused: false, 
      gameOver: false 
    }));
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-bitcoin text-crypto-dark mb-4">
            <Gamepad2 className="mr-2" size={16} />
            NFT CHASE GAME
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-electric-blue bg-clip-text text-transparent">
            🏃‍♂️ Chase for Crypto
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Das ultimative Krypto-Verfolgungsspiel! Sammle Bitcoin, weiche Hindernissen aus und erreiche das nächste Level.
          </p>
        </div>

        {!isConnected || !hasAccess ? (
          <div className="max-w-2xl mx-auto mb-12">
            <WalletSelector />
          </div>
        ) : (
          <TokenGate minBalance={1}>
            <div className="max-w-6xl mx-auto">
              {/* Game Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-bitcoin">{gameState.score}</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-electric-blue">{gameState.level}</div>
                    <div className="text-sm text-muted-foreground">Level</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-500">{gameState.lives}</div>
                    <div className="text-sm text-muted-foreground">Lives</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">{Math.ceil(gameState.timeLeft)}</div>
                    <div className="text-sm text-muted-foreground">Zeit</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 border-border">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-500">{highScore}</div>
                    <div className="text-sm text-muted-foreground">Best</div>
                  </CardContent>
                </Card>
              </div>

              {/* Game Canvas */}
              <Card className="bg-card/80 border-border mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <canvas
                      ref={canvasRef}
                      width={GAME_WIDTH}
                      height={GAME_HEIGHT}
                      className="border border-border rounded-lg bg-crypto-darker max-w-full h-auto"
                      style={{ aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}` }}
                    />
                    
                    {/* Game Controls */}
                    <div className="flex items-center space-x-4 mt-6">
                      {!gameState.isPlaying ? (
                        <Button onClick={handleStartGame} size="lg" className="min-w-32">
                          <Play className="mr-2" size={20} />
                          {gameState.gameOver ? 'Neues Spiel' : 'Start'}
                        </Button>
                      ) : (
                        <Button onClick={handlePauseGame} size="lg" className="min-w-32">
                          {gameState.isPaused ? <Play className="mr-2" size={20} /> : <Pause className="mr-2" size={20} />}
                          {gameState.isPaused ? 'Weiter' : 'Pause'}
                        </Button>
                      )}
                      <Button onClick={handleResetGame} variant="outline" size="lg">
                        <RotateCcw className="mr-2" size={20} />
                        Reset
                      </Button>
                    </div>

                    {/* Instructions */}
                    <div className="mt-4 text-center text-muted-foreground">
                      <p className="text-sm">
                        Nutze WASD oder Pfeiltasten zum Bewegen • Sammle Bitcoin • Weiche Hindernissen aus
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Over Modal */}
              {gameState.gameOver && (
                <Card className="max-w-md mx-auto bg-card/95 border-border">
                  <CardContent className="p-8 text-center">
                    <Trophy className="h-16 w-16 text-bitcoin mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                    <p className="text-muted-foreground mb-4">
                      Du hast Level {gameState.level} erreicht und {gameState.score} Punkte gesammelt!
                    </p>
                    {gameState.score === highScore && (
                      <Badge className="bg-bitcoin text-crypto-dark mb-4">
                        🎉 Neuer Highscore!
                      </Badge>
                    )}
                    <Button onClick={handleStartGame} className="w-full">
                      <Play className="mr-2" size={20} />
                      Nochmal spielen
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TokenGate>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-card/80 border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Gamepad2 className="h-6 w-6 text-primary" />
                <CardTitle>Spiel Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Endloses Gameplay</li>
                <li>• Bitcoin sammeln</li>
                <li>• Level-System</li>
                <li>• Highscore-Tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>NFT Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Token-Gate Zugang</li>
                <li>• NFT Belohnungen</li>
                <li>• Exklusive Inhalte</li>
                <li>• Community Features</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border-border">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-primary" />
                <CardTitle>Belohnungen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• MURAT Token verdienen</li>
                <li>• Achievements</li>
                <li>• Leaderboards</li>
                <li>• Seltene NFTs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Game;