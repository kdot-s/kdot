import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Crosshair } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  features: string[];
  category: string;
  purchase_url: string | null;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group relative overflow-hidden border-border bg-surface p-0 transition hover:border-primary/60 hover:glow">
      <div className="relative aspect-video overflow-hidden bg-background">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center grid-bg">
            <Crosshair className="h-12 w-12 text-primary/40" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur">{product.category}</Badge>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-wide">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        </div>
        {product.features.length > 0 && (
          <ul className="space-y-1.5">
            {product.features.slice(0, 4).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <div className="font-mono text-2xl font-bold text-gradient">${product.price.toFixed(2)}</div>
          </div>
          <Button asChild size="sm">
            <a href={product.purchase_url || "https://discord.gg/fkRThkmE3s"} target="_blank" rel="noreferrer">
              Get it <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
