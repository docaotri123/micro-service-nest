import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';

@Controller('hello')
export class HelloController {
    delay(ms: number) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, ms);
        });
      }

    @MessagePattern({ cmd: 'sum' })
    async accumulate(data: number[]): Promise<Observable<number>> {
        console.log(data);

        console.log('Before the delay');

        await this.delay(6000);

        console.log('After setTimeout()');

        return from(data);
    }

    @EventPattern('event_name')
    handleEvent(data: any) {
        // Handle the event

        console.log('data', data);
        return "ok";
    }

    @EventPattern('event_name')
    handleEvent2(data: any) {
        // Handle the event

        console.log('data2', data);
        return "ok2";
    }
}
