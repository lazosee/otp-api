// emails/OtpEmail.tsx
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'

export interface OtpEmailProps {
	otp: string
	email: string
	ttl?: number
	appname?: string
}

export const OtpEmail = ({
	otp,
	email,
	ttl,
	appname = 'Open Security Protocol',
}: OtpEmailProps) => {
	const { expiresIn } = { expiresIn: ttl ? `${(ttl / 60).toFixed(0)} minutes` : '5 minutes' }

	return (
		<Html>
			<Head />
			<Preview>{otp}. Your one-time secure access code (OTP)</Preview>
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container className="mx-auto py-12 px-4 max-w-[465px] border border-slate-100 shadow-sm">
						<Heading className="text-zinc-400 text-xs uppercase tracking-[0.2em] font-light">
							{appname}
						</Heading>
						<Text className="text-zinc-800 text-xl leading-relaxed font-serif italic my-6">
							"Identity is the threshold through which we enter the workspace."
						</Text>
						<Section className="bg-zinc-50 rounded-lg p-8 text-center border border-zinc-100">
							<Text className="text-sm text-zinc-500 mb-2 uppercase tracking-widest">
								Verification Code
							</Text>
							<Text className="text-4xl font-light tracking-[0.5em] text-zinc-900">{otp}</Text>

							{/* Refined Brand Section */}
							<Hr className="my-6 border-zinc-200 w-12 mx-auto" />

							<Text className="text-[11px] text-zinc-500 leading-relaxed max-w-[280px] mx-auto uppercase tracking-wider">
								This temporary credential was issued for{' '}
								<span className="text-zinc-800">{email}</span>. Entry access remains valid for{' '}
								{expiresIn} before automatic revocation.
							</Text>
						</Section>
						<Section className="mt-8 px-2">
							<Text className="text-[10px] text-zinc-400 leading-tight">
								<strong className="text-zinc-500 font-medium uppercase tracking-tighter">
									Security Notice:&nbsp;
								</strong>
								If you did not initiate this authentication request, please ignore this transmission
								or contact the studio.
							</Text>
						</Section>
						<Hr className="my-8 border-zinc-100" />
						<Text className="text-[10px] text-zinc-400 leading-relaxed uppercase tracking-[0.2em] font-light">
							Lazaro Osee — Architecture & Software Studio
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
