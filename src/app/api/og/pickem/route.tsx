// filepath: src/app/api/og/pickem/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get('username') || 'buque';
  const points = searchParams.get('points') || '320';
  const season = searchParams.get('season') || '2026/27';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#080808',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow de fondo */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-100px',
            width: '600px',
            height: '600px',
            backgroundColor: 'rgba(255, 90, 31, 0.25)',
            borderRadius: '50%',
            filter: 'blur(120px)',
          }}
        />

        {/* Header con marca Drafteados */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>
              DRAFTEADOS
            </span>
            <span
              style={{
                backgroundColor: '#FF5A1F',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: '6px',
                letterSpacing: '2px',
              }}
            >
              PICK'EM
            </span>
          </div>

          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#8B8B8B',
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}
          >
            TEMPORADA {season}
          </span>
        </div>

        {/* Centro: Usuario y Puntos */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#FF5A1F', letterSpacing: '4px' }}>
            PRONÓSTICO OFICIAL SELLADO
          </span>

          <span style={{ fontSize: '68px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-2px' }}>
            @{username}
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: '#141414',
              border: '2px solid rgba(255, 90, 31, 0.4)',
              padding: '16px 36px',
              borderRadius: '24px',
            }}
          >
            <span style={{ fontSize: '48px', fontWeight: 900, color: '#FF5A1F' }}>
              {points}
            </span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#A1A1AA', letterSpacing: '2px' }}>
              PUNTOS POTENCIALES
            </span>
          </div>
        </div>

        {/* Footer: Claim Drafteados */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>
            ¿PODÉS SUPERARME?
          </span>

          <span style={{ fontSize: '20px', fontWeight: 700, color: '#FF5A1F' }}>
            drafteados.com/pickem
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
