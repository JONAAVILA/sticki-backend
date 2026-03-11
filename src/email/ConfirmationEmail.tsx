import { Html,Button,Section,Text } from "@react-email/components"
 
export const ConfirmationEmail = ({baseUrl,token})=>{
    const confirmUrl = `${baseUrl}/api/auth/email-confirmation?confirmation=${token}`;

    return(
        <Html>
            <Section>
                <Text>Haz clic en el botón de abajo para verificar tu cuenta:</Text>
                <Button
                    href={confirmUrl}
                    style={{ background: '#0070f3', color: '#fff', padding: '12px 20px', borderRadius: '5px' }}
                >
                Confirmar Cuenta
                </Button>
            </Section>
        </Html>
    )
}