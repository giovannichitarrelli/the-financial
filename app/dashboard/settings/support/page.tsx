import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { CircleHelp, Headset, Smile } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

import Link from "next/link";

export default function Support() {
  return (
    <Card>
      <CardHeader className="border border-border">
        <div className="items-flex flex justify-between">
          <CardTitle>Suporte</CardTitle>
          <CircleHelp className="h-4 w-4" />
        </div>
        <CardDescription>
          Leia nosso <span className="font-bold">FAQ</span>. Se continuar com
          dúvidas, entre em contato para obter suporte personalizado.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-6">
        <p className="text-sm font-light ">
          Não se preocupe, estamos aqui para ajudar! <br />
          Se possui dúvidas sobre como usar uma funcionalidade específica, ou se
          encontrar algum erro ou comportamento inesperado, por favor, entre em
          contato conosco imediatamente.
        </p>

        <Card className="my-6">
          <CardHeader className="font-bold">
            Perguntas Frequentes (FAQ)
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Como posso adicionar uma nova despesa?
                </AccordionTrigger>
                <AccordionContent>
                  Para adicionar uma nova despesa, navegue até a seção de
                  despesas e clique no botão *Adicionar Despesa*.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Posso categorizar minhas despesas?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, você pode categorizar suas despesas. Basta selecionar a
                  categoria adequada ao adicionar ou editar uma despesa.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Como faço para ver um resumo dos meus gastos mensais?
                </AccordionTrigger>
                <AccordionContent>
                  Você pode visualizar um resumo dos seus gastos mensais na
                  seção de relatórios. Lá, você encontrará diversas análises,
                  incluindo um resumo dos gastos por categoria.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  É possível configurar alertas de gastos?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, você pode configurar alertas de gastos para receber
                  notificações quando atingir um determinado limite de gastos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Encontrei um erro na aplicação, o que faço?
                </AccordionTrigger>
                <AccordionContent>
                  Não se preocupe! Entre em contato imediatamente. Nosso time
                  resolverá seu problema em instantes!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Estou sentindo falta de uma funcionalidade específica, posso
                  fazer sugestões?
                </AccordionTrigger>
                <AccordionContent>
                  Com certeza! Envie-nos sua sugestão por whatsapp clicando no
                  botão abaixo!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        <p className="text-sm font-light ">
          Se ainda precisar de assistência ou se sua pergunta não estiver
          respondida em nosso <span className="font-bold"> FAQ</span>, não
          hesite em nos contatar. <br /> Nossa equipe de suporte estará pronta
          para ajudá-lo da melhor maneira possível.
        </p>

        <div className="flex  items-center">
          <p className="mr-2 font-bold text-green-500">
            Obrigado por usar nosso aplicativo e por nos ajudar a torná-lo ainda
            melhor!
          </p>
          <Smile className="h-4 w-4" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-6">
        <span> Entre em contato pelo email!</span>
        <Link
          href="mailto:suporte@meudindin.online"
          target="_blank"
          rel="noopener noreferrer"
          passHref={true}
        >
          <Button>
            <>
              <Headset className="mr-2 h-4 w-4" />
              Obter Suporte
            </>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
