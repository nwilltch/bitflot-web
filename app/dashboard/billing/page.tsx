import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import { getCreatorSubscription } from "@/app/actions/subscriptions"
import Link from "next/link"

export default async function BillingPage() {
    const subscription = await getCreatorSubscription()

    const plans = [
        {
            name: "FREE",
            price: "$0",
            period: "forever",
            icon: Rocket,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            features: [
                "1 Published App",
                "Basic Nodes Only",
                "Community Support",
                "Bitflot Branding"
            ],
            limitations: [
                "No Premium Nodes",
                "No Custom Branding"
            ],
            current: subscription.plan === 'FREE',
            cta: subscription.plan === 'FREE' ? "Current Plan" : "Downgrade"
        },
        {
            name: "PRO",
            price: "$29",
            period: "per month",
            icon: Zap,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            popular: true,
            features: [
                "Unlimited Apps",
                "Premium Nodes (OpenAI, Code)",
                "Stripe Paywall Nodes",
                "Priority Support",
                "Custom Branding",
                "Advanced Analytics"
            ],
            limitations: [],
            current: subscription.plan === 'PRO',
            cta: subscription.plan === 'PRO' ? "Current Plan" : "Upgrade to PRO"
        },
        {
            name: "ENTERPRISE",
            price: "Custom",
            period: "contact us",
            icon: Crown,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
            features: [
                "Everything in PRO",
                "White Label Solution",
                "Dedicated Support",
                "99.9% SLA",
                "Custom Integrations",
                "On-Premise Deployment"
            ],
            limitations: [],
            current: subscription.plan === 'ENTERPRISE',
            cta: subscription.plan === 'ENTERPRISE' ? "Current Plan" : "Contact Sales"
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Billing & Plans</h1>
                            <p className="text-muted-foreground mt-2">
                                Choose the perfect plan for your needs
                            </p>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Current Plan Info */}
            <div className="container mx-auto px-6 py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>
                            You are currently on the <strong>{subscription.plan}</strong> plan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <div className="text-sm text-muted-foreground">Apps Published</div>
                                <div className="text-2xl font-bold mt-1">
                                    {subscription.max_apps === 999 ? '∞' : `0 / ${subscription.max_apps}`}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Premium Nodes</div>
                                <div className="text-2xl font-bold mt-1">
                                    {subscription.features?.premium_nodes ? '✓ Enabled' : '✗ Disabled'}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Custom Branding</div>
                                <div className="text-2xl font-bold mt-1">
                                    {subscription.features?.custom_branding ? '✓ Enabled' : '✗ Disabled'}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan) => {
                        const IconComponent = plan.icon
                        return (
                            <Card
                                key={plan.name}
                                className={`relative ${plan.current ? 'border-primary shadow-lg' : ''} ${plan.popular ? 'border-purple-500' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-4">
                                    <div className={`w-16 h-16 rounded-full ${plan.bgColor} flex items-center justify-center mx-auto mb-4`}>
                                        <IconComponent className={`h-8 w-8 ${plan.color}`} />
                                    </div>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.period && (
                                            <span className="text-muted-foreground text-sm ml-2">
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Features */}
                                    <div>
                                        <h4 className="font-semibold text-sm mb-3">Includes:</h4>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Limitations */}
                                    {plan.limitations.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Limitations:</h4>
                                            <ul className="space-y-2">
                                                {plan.limitations.map((limitation, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span>•</span>
                                                        <span>{limitation}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <Button
                                        className="w-full"
                                        disabled={plan.current}
                                        variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What are Premium Nodes?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Premium Nodes include OpenAI integration, Custom Code execution, and Stripe payment processing.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Yes, we offer a 14-day money-back guarantee for all paid plans.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What happens to my apps if I downgrade?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Your apps remain published, but you won't be able to create new ones until you're within your plan limit.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
