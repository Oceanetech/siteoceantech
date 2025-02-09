<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nome = htmlspecialchars($_POST['name']);
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $assunto = htmlspecialchars($_POST['subject']);
        $mensagem = nl2br(htmlspecialchars($_POST['message']));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["status" => "error", "message" => "E-mail inválido."]);
            exit; // 🔹 IMPEDINDO SAÍDA DUPLICADA
        }

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.titan.email';
        $mail->SMTPAuth = true;
        $mail->Username = 'comercial@oceantechsolutions.com.br';
        $mail->Password = 'Oceantech1234!@#$';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom('comercial@oceantechsolutions.com.br', 'Oceantech Solutions');
        $mail->addAddress('pgrocha03@gmail.com', $nome);
        
        $mail->isHTML(true);
        $mail->Subject = "Nova mensagem de $nome: $assunto";
        $mail->Body = "<h3>Mensagem:</h3><p>$mensagem</p>";
        $mail->AltBody = "Mensagem: $mensagem";

        if ($mail->send()) {
            echo json_encode([
                "status" => "success",
                "message" => "E-mail enviado com sucesso! Nossa equipe entrará em contato em breve."
            ]);
            exit; // 🔹 SAÍDA FORÇADA PARA EVITAR DUPLICIDADE
        } else {
            echo json_encode(["status" => "error", "message" => "Falha ao enviar o e-mail."]);
            exit;
        }
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Erro ao enviar e-mail: {$mail->ErrorInfo}"]);
    exit;
}
?>
