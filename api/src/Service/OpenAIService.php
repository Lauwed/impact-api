<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class OpenAIService
{
    private HttpClientInterface $httpClient;
    private string $apiKey;


    public function __construct(
        HttpClientInterface $httpClient,
        #[Autowire(env: 'OPENAI_API_KEY')]
        string $apiKey
    ) {
        $this->httpClient = $httpClient;
        $this->apiKey = $apiKey;
    }

    public function getResponse(string $prompt, float $temperature = 0.2, int $maxTokens = 2048): string
    {
        $response = $this->httpClient->request('POST', 'https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4o-mini',
                'messages' => [
                        ['role' => 'user', 'content' => $prompt],
                    ],
                "temperature" => $temperature,
                "max_tokens" => $maxTokens,
            ],
        ]);

        $data = $response->toArray();
        return $data['choices'][0]['message']['content'];
    }
}
