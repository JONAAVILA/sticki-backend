import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface confirmEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

export const ConfirmEmail = ({
  username,
  inviteLink,
}: confirmEmailProps) => {
  const previewText = `Confirma tu cuenta ${username} en Stiki`;

  return (
    <Html>
      <Head/>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="p-10 max-w-[460px] border rounded-3xl">
            <Section className="mt-[32px]">
              <Img
                src="https://res.cloudinary.com/dmcntnjtk/image/upload/v1773752627/icon-light_knfsfq.svg"
                height="60"
                alt="Vercel Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Estás por unirte a <strong>Stiki</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username}!,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]"> 
                Para confirmar tu perfil en
                <strong>Stiki</strong> presiosa el botón debajo.
            </Text>
            <Section className='grid'>
              <Row className='flex justify-center'>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src="https://res.cloudinary.com/dmcntnjtk/image/upload/v1773758861/icon-profile_eg4sle.svg"
                    width="50"
                    height="50"
                    alt={`foto de perfil de el usuario ${username}`}
                  />
                </Column>
                <Column align="center">
                  <Img
                    src="https://res.cloudinary.com/dmcntnjtk/image/upload/v1773755057/arrow-narrow-right_tictyo.svg"
                    height="20"
                    width="30"
                    alt="flecha de señalación"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    src="https://res.cloudinary.com/dmcntnjtk/image/upload/v1773752627/icon-light_knfsfq.svg"
                    height="50"
                    width="60"
                    alt="Stiki logo"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Confirmar
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              Si no funciona el botón, pega éste link en tu navegador:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmEmail;
