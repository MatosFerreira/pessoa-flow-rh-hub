
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Upload,
  Send,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PublicJobApplication = () => {
  const { jobId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    motivation: '',
    resume: null as File | null
  });

  // Dados mockados da vaga
  const jobData = {
    id: jobId,
    title: 'Desenvolvedor React Senior',
    company: 'Empresa Demo',
    department: 'Tecnologia',
    location: 'São Paulo, SP',
    type: 'CLT',
    salary: 'R$ 8.000 - R$ 12.000',
    description: `Estamos procurando um Desenvolvedor React Senior para se juntar ao nosso time de tecnologia. 
    
Responsabilidades:
• Desenvolver aplicações web usando React, TypeScript e Next.js
• Colaborar com o time de design para implementar interfaces intuitivas
• Participar de code reviews e melhorias no código
• Mentorear desenvolvedores júnior

Requisitos:
• 3+ anos de experiência com React
• Conhecimento em TypeScript
• Experiência com Next.js
• Conhecimento em testes automatizados
• Git e metodologias ágeis`,
    requirements: [
      'React e TypeScript',
      'Next.js',
      'Testes automatizados',
      '3+ anos de experiência',
      'Git e metodologias ágeis'
    ],
    benefits: [
      'Vale refeição',
      'Plano de saúde',
      'Home office flexível',
      'Auxílio educação',
      'Gympass'
    ]
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Formato não suportado",
          description: "Envie apenas arquivos PDF ou Word",
          variant: "destructive",
        });
        return;
      }
      
      setFormData({...formData, resume: file});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: "Candidatura enviada!",
      description: "Recebemos sua candidatura. Entraremos em contato em breve!",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Candidatura Enviada!
              </h2>
              <p className="text-gray-600">
                Obrigado pelo seu interesse na vaga de <strong>{jobData.title}</strong>.
              </p>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>✅ Sua candidatura foi recebida com sucesso</p>
              <p>📧 Você receberá um e-mail de confirmação</p>
              <p>📞 Entraremos em contato em até 5 dias úteis</p>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Próximos passos:</strong><br />
                Nossa equipe de RH analisará seu perfil e entraremos em contato caso você seja selecionado para a próxima etapa.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header da empresa */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plataforma Pessoas</h1>
              <p className="text-blue-600 font-medium">{jobData.company}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Informações da vaga */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">{jobData.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {jobData.department} • {jobData.company}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Vaga Ativa
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>{jobData.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{jobData.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Publicada hoje</span>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-700">
                    {jobData.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobData.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefícios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {jobData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulário de candidatura */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Candidate-se à vaga</CardTitle>
                <CardDescription>
                  Preencha seus dados e envie sua candidatura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      placeholder="Cidade, Estado"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiência relevante</Label>
                    <Textarea
                      id="experience"
                      placeholder="Descreva brevemente sua experiência relacionada à vaga"
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Por que quer trabalhar conosco?</Label>
                    <Textarea
                      id="motivation"
                      placeholder="Conte-nos o que te motiva a trabalhar na nossa empresa"
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Currículo (PDF ou Word)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">
                        <label htmlFor="resume" className="cursor-pointer text-blue-600 hover:text-blue-500">
                          Clique para selecionar
                        </label>
                        <span> ou arraste seu arquivo aqui</span>
                      </div>
                      <input
                        id="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Máximo 5MB (PDF, DOC, DOCX)
                      </p>
                      {formData.resume && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.resume.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Candidatura
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Ao enviar, você concorda com o processamento dos seus dados conforme nossa política de privacidade.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicJobApplication;
